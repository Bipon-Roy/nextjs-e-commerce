import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY!;
const webHookSecret = process.env.STRIPE_WEBHOOK_KEY!;
const stripe = new Stripe(stripeSecret, {
    apiVersion: "2024-04-10",
});

export const POST = async (req: Request) => {
    const data = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    let event;
    try {
        event = await stripe.webhooks.constructEvent(data, signature, webHookSecret);
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 400 });
    }

    if ((event.type = "checkout.session.completed")) {
        //create order list
        //manage product stock
    }
    return NextResponse.json({});
};
