import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session?.user)
            return NextResponse.json(
                {
                    error: "Unauthorized request!",
                    message: "No user found!",
                },
                { status: 401 }
            );

        const data = await req.json();
        const productId = data.productId as string;

        if (!isValidObjectId(productId))
            return NextResponse.json(
                {
                    error: "Invalid product id!",
                    message: "Product doesn't exist",
                },
                { status: 401 }
            );
        await startDb();
        // fetching product details
        const product = await ProductModel.findById(productId);
        if (!product)
            return NextResponse.json(
                {
                    error: "Product not found!",
                    message: "Product doesn't exist",
                },
                { status: 404 }
            );

        const line_items = {
            price_data: {
                currency: "USD",
                unit_amount: product.price.discounted * 100,
                product_data: {
                    name: product.title,
                    images: [product.thumbnail.url],
                },
            },
            quantity: 1,
        };

        const customer = await stripe.customers.create({
            metadata: {
                userId: session.user.id,
                type: "instant-checkout",
                product: JSON.stringify({
                    id: productId,
                    title: product.title,
                    price: product.price.discounted,
                    totalPrice: product.price.discounted,
                    thumbnail: product.thumbnail.url,
                    qty: 1,
                }),
            },
        });

        // generate payment link and send to client
        const params: Stripe.Checkout.SessionCreateParams = {
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [line_items],
            success_url: process.env.PAYMENT_SUCCESS_URL!,
            cancel_url: process.env.PAYMENT_CANCEL_URL!,
            shipping_address_collection: { allowed_countries: ["US"] },
            customer: customer.id,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);
        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something went wrong, could not checkout!",
                message: "Internal server error!",
            },
            { status: 500 }
        );
    }
};
