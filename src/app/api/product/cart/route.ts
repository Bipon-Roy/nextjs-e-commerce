import startDb from "@/app/lib/db";
import cartModel from "@/app/models/cartModel";
import { auth } from "@/auth";
import { NewCartRequest } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        const user = session?.user;
        //throw error while there is no valid user
        if (!user) return NextResponse.json({ error: "unauthorized request" }, { status: 401 });

        const { productId, quantity } = (await req.json()) as NewCartRequest;

        //throw error while there is no product on the id
        if (!isValidObjectId(productId) || !isNaN(quantity)) {
            NextResponse.json({ error: "Invalid request" }, { status: 401 });
        }

        await startDb();
        //check if there is already cart item or not
        const cart = await cartModel.findOne({ userId: user.id });

        if (!cart) {
            await cartModel.create({
                userId: user.id,
                items: [{ productId, quantity }],
            });
        }
        return NextResponse.json({ success: true });
    } catch (error) {}
};
