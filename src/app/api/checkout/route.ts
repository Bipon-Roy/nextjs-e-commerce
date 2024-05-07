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

        //TODO:fetching cart details
    } catch (error) {
        console.log(error);
    }
};
