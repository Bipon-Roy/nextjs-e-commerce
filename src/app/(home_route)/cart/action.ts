"use server";
import startDb from "@lib/db";
import cartModel from "@models/cartModel";
import { auth } from "@/auth";
import { Types } from "mongoose";

interface CartProduct {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    qty: number;
    totalPrice: number;
}

interface Cart {
    id: string;
    totalQty: number;
    totalPrice: number;
    products: CartProduct[];
}

export const fetchCartProducts = async (): Promise<Cart | null> => {
    const session = await auth();
    if (!session?.user) return null;
    await startDb();

    const [cartItems] = await cartModel
        .aggregate([
            { $match: { userId: new Types.ObjectId(session.user.id) } },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    foreignField: "_id",
                    localField: "items.productId",
                    as: "product",
                },
            },
            {
                $project: {
                    _id: 0,
                    id: { $toString: "$_id" },
                    totalQuantity: { $sum: "$items.quantity" },
                    products: {
                        id: { $toString: { $arrayElemAt: ["$product._id", 0] } },
                        thumbnail: { $arrayElemAt: ["$product.thumbnail.url", 0] },
                        title: { $arrayElemAt: ["$product.title", 0] },
                        price: { $arrayElemAt: ["$product.price.discounted", 0] },
                        qty: "$items.quantity",
                        totalPrice: {
                            $multiply: [
                                "$items.quantity",
                                { $arrayElemAt: ["$product.price.discounted", 0] },
                            ],
                        },
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    id: { $first: "$id" },
                    totalQty: { $sum: "$totalQuantity" },
                    totalPrice: { $sum: "$products.totalPrice" },
                    products: { $push: "$products" },
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    totalQty: 1,
                    totalPrice: 1,
                    products: 1,
                },
            },
        ])
        .exec();

    return cartItems || null;
};
