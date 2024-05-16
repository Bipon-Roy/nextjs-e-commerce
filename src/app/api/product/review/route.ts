import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import ReviewModel from "@/app/models/reviewModel";
import { auth } from "@/auth";
import { ReviewRequestType } from "@/types";
import { Types, isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
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

        await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
            upsert: true,
        });

        await updateProductRating(productId);

        return NextResponse.json(
            { success: true, message: "Thanks for your feedback" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong!!" }, { status: 500 });
    }
};

const updateProductRating = async (productId: string) => {
    const [result] = await ReviewModel.aggregate([
        { $match: { product: new Types.ObjectId(productId) } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
            },
        },
    ]);

    if (result?.averageRating) {
        await ProductModel.findByIdAndUpdate(productId, {
            rating: result.averageRating,
        });
    }
};
