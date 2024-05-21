import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "unauthorized request!!" }, { status: 403 });
        }

        const { productId } = await req.json();

        if (!isValidObjectId(productId)) {
            return NextResponse.json({ error: "invalid product id!!" }, { status: 404 });
        }

        const wishlist = await WishlistModel.findOne({
            user: session.user.id,
            products: productId,
        });

        if (wishlist) {
            await WishlistModel.findByIdAndUpdate(wishlist._id, {
                $pull: { products: productId },
            });
            return NextResponse.json(
                { success: true, message: "Product removed from wishlist" },
                { status: 201 }
            );
        } else {
            await WishlistModel.findOneAndUpdate(
                {
                    user: session.user.id,
                },
                {
                    user: session.user.id,
                    $push: { products: productId },
                },
                { upsert: true }
            );
        }
        return NextResponse.json(
            { success: true, message: "Product added to wishlist" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong!!" }, { status: 500 });
    }
};
