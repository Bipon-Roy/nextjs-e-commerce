import startDb from "@/app/lib/db";
import ReviewModel from "@/app/models/reviewModel";
import { auth } from "@/auth";
import { ReviewRequestType } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorize request" }, { status: 401 });
    }
    const { productId, comment, rating } = (await req.json()) as ReviewRequestType;

    if (!isValidObjectId(productId)) {
        return NextResponse.json({ error: "Invalid product id" }, { status: 401 });
    }
    if (rating <= 0 || rating > 5) {
        return NextResponse.json({ error: "Invalid rating value" }, { status: 401 });
    }

    await startDb();

    const userId = session.user.id;
    const data = { userId, rating, comment, product: productId };

    await ReviewModel.findByIdAndUpdate({ userId, product: productId }, data, {
        upsert: true,
    });

    return NextResponse.json({ success: true, message: "Request successful" }, { status: 401 });
};
