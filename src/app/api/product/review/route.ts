import startDb from "@/app/lib/db";
import ReviewModel from "@/app/models/reviewModel";
import { auth } from "@/auth";
import { ReviewRequestType } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorize request" }, { status: 401 });
        }
        const { productId, comment, rating } = (await req.json()) as ReviewRequestType;

        if (!isValidObjectId(productId)) {
            console.log("checkpoint 1");
            return NextResponse.json({ error: "Invalid product id" }, { status: 401 });
        }
        if (rating <= 0 || rating > 5) {
            console.log("checkpoint 2");
            return NextResponse.json({ error: "Invalid rating value" }, { status: 401 });
        }
        console.log("checkpoint 3");
        await startDb();
        console.log("checkpoint 4");
        const userId = session.user.id;
        const data = { userId, rating, comment, product: productId };
        console.log("checkpoint 5");
        await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
            upsert: true,
        });
        console.log("checkpoint 6");

        return NextResponse.json(
            { success: true, message: "Thanks for your feedback" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong, could not update review!" },
            { status: 500 }
        );
    }
};
