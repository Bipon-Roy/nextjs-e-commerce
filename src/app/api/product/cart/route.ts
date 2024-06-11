import startDb from "@/app/lib/db";
import CartModel from "@/app/models/cartModel";
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
        if (!isValidObjectId(productId) || isNaN(quantity)) {
            NextResponse.json(
                { error: "Invalid request", message: "Invalid Product Id or Quantity" },
                { status: 401 }
            );
        }

        await startDb();
        //check if there is already cart item or not
        const cart = await CartModel.findOne({ userId: user.id });

        if (!cart) {
            await CartModel.create({
                userId: user.id,
                items: [{ productId, quantity }],
            });
            return NextResponse.json(
                { success: true, message: "Product added to cart!" },
                { status: 201 }
            );
        }

        const existingItem = cart.items.find((item) => item.productId.toString() === productId);

        if (existingItem) {
            //update quantity if product already exist in database
            existingItem.quantity += quantity;
            // remove product id when quantity becomes zero
            if (existingItem.quantity <= 0) {
                cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
            }
        } else {
            //add new item if it doesn't exists
            cart.items.push({ productId: productId as any, quantity });
        }

        await cart.save();

        return NextResponse.json(
            { success: true, message: "Product added to cart!" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 500 });
    }
};
