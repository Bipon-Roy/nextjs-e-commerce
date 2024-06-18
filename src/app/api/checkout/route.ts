import { getCartItems } from "@/app/lib/cartHelper";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.Stripe_Secret_Key!, {
    apiVersion: "2024-04-10",
});

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session?.user) {
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
            return NextResponse.json(
                {
                    error: "Invalid Cart ID!",
                },
                { status: 401 }
            );
        }

        //fetching cart details
        const cartItems = await getCartItems(session.user.id, cartId);
        if (!cartItems) {
            return NextResponse.json(
                {
                    error: "Cart not found!",
                },
                { status: 404 }
            );
        }

        const line_items = cartItems.products.map((product) => {
            return {
                price_data: {
                    currency: "USD",
                    unit_amount: product.price * 100,
                    product_data: {
                        name: product.title,
                        images: [product.thumbnail],
                    },
                },
                quantity: product.qty,
            };
        });

        //create user
        const customer = await stripe.customers.create({
            metadata: {
                userId: session.user.id,
                cartId: cartId,
                type: "checkout",
            },
        });
        //generate payment link and send to frontend
        const params: Stripe.Checkout.SessionCreateParams = {
            mode: "payment",
            payment_method_types: ["card"],
            line_items,
            success_url: process.env.Payment_Success_Url!,
            cancel_url: process.env.Payment_Cancel_Url!,
            shipping_address_collection: { allowed_countries: ["US"] },
            customer: customer.id,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);

        return NextResponse.json({
            url: checkoutSession.url,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Something wrong can not create order" },
            { status: 500 }
        );
    }
};
