"use server";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ReviewModel from "@models/reviewModel";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId, isValidObjectId } from "mongoose";
import { Types } from "mongoose";
import { Review } from "@/components/ProductReviews";

interface WishlistProduct {
    _id: Types.ObjectId;
}

interface Wishlist {
    _id: Types.ObjectId;
    products: WishlistProduct[];
}

interface ProductResponse {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    images?: string[];
    bulletPoints: string[];
    price: {
        base: number;
        discounted: number;
    };
    sale: number;
    rating?: number;
    outOfStock: boolean;
}

interface SimilarProductResponse {
    id: string;
    title: string;
    thumbnail: string;
    price: {
        base: number;
        discounted: number;
    };
    sale: number;
    isInWishlist: boolean;
}

export const fetchProductDetails = async (id: string): Promise<ProductResponse | null> => {
    if (!isValidObjectId(id)) return null;

    await startDb();
    const productInfo = await ProductModel.findById(id).lean();
    if (!productInfo) return null;

    return {
        id: productInfo._id.toString(),
        title: productInfo.title,
        description: productInfo.description,
        thumbnail: productInfo.thumbnail.url,
        images: productInfo.images?.map(({ url }) => url) ?? [],
        bulletPoints: productInfo.bulletPoints ?? [],
        price: productInfo.price,
        sale: productInfo.sale,
        rating: productInfo.rating,
        outOfStock: productInfo.quantity <= 0,
    };
};

export const fetchProductReviews = async (productId: string): Promise<Review[]> => {
    await startDb();
    const reviews = await ReviewModel.find({ product: productId })
        .populate<{ userId: { _id: ObjectId; name: string; avatar?: { url: string } } }>({
            path: "userId",
            select: "name avatar.url",
        })
        .lean();

    return reviews.map((data) => ({
        id: data._id.toString(),
        rating: data.rating,
        comment: data.comment || "",
        date: data.createdAt.toISOString(),
        userInfo: {
            id: data.userId._id.toString(),
            name: data.userId.name,
            avatar: data.userId.avatar?.url || "",
        },
    }));
};

export const fetchSimilarProducts = async (): Promise<SimilarProductResponse[]> => {
    await startDb();
    const products = await ProductModel.find().sort({ rating: -1 }).limit(5).lean();
    const session = await auth();
    const userId = session?.user?.id;

    const wishlist = userId ? await WishlistModel.findOne({ user: userId }).lean<Wishlist>() : null;

    const wishlistProductIds: string[] =
        wishlist?.products?.map((product) => product._id.toString()) ?? [];

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        thumbnail: prod.thumbnail.url,
        price: prod.price,
        sale: prod.sale,
        isInWishlist: wishlistProductIds.includes(prod._id.toString()),
    }));
};
