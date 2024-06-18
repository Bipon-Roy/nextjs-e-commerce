import { getCartItems } from "@/app/lib/cartHelper";
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
        if (!session?.user) {
            console.error("Unauthorized request: No session found");
            return NextResponse.json(
                {
                    error: "Unauthorized request!",
                },
                { status: 401 }
            );
        }

        const data = await req.json();
        const cartId = data.cartId as string;

        if (!isValidObjectId(cartId)) {
            console.error("Invalid Cart ID:", cartId);
            return NextResponse.json(
                {
                    error: "Invalid Cart ID!",
                },
                { status: 401 }
            );
        }

        // Fetching cart details
        const cartItems = await getCartItems(session.user.id, cartId);
        if (!cartItems) {
            console.error("Cart not found for cartId:", cartId);
            return NextResponse.json(
                {
                    error: "Cart not found!",
                },
                { status: 404 }
            );
        }

        const line_items = cartItems.products.map((product) => ({
            price_data: {
                currency: "USD",
                unit_amount: product.price * 100,
                product_data: {
                    name: product.title,
                    images: [product.thumbnail],
                },
            },
            quantity: product.qty,
        }));

        console.log("Line items:", line_items);

        // Create Stripe customer
        const customer = await stripe.customers.create({
            metadata: {
                userId: session.user.id,
                cartId: cartId,
                type: "checkout",
            },
        });

        console.log("Customer created:", customer.id);

        // Generate Stripe Checkout session
        const params: Stripe.Checkout.SessionCreateParams = {
            mode: "payment",
            payment_method_types: ["card"],
            line_items,
            success_url: process.env.PAYMENT_SUCCESS_URL!,
            cancel_url: process.env.PAYMENT_CANCEL_URL!,
            shipping_address_collection: { allowed_countries: ["US"] },
            customer: customer.id,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);

        console.log("Checkout session created:", checkoutSession.url);

        return NextResponse.json({
            url: checkoutSession.url,
        });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        return NextResponse.json(
            { error: "Something went wrong. Cannot create order." },
            { status: 500 }
        );
    }
};
