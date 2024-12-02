import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ReviewModel from "@models/reviewModel";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId, isValidObjectId } from "mongoose";
import { Review } from "@/components/ProductReviews";

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
    isWishlist: boolean;
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
}

export const fetchProductDetails = async (id: string): Promise<ProductResponse | null> => {
    if (!isValidObjectId(id)) return null;

    await startDb();
    const productInfo = await ProductModel.findById(id).lean();
    if (!productInfo) return null;

    let isWishlist = false;
    const session = await auth();

    if (session?.user) {
        const wishlist = await WishlistModel.findOne({
            user: session.user.id,
            products: productInfo._id,
        });

        isWishlist = wishlist ? true : false;
    }
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
        isWishlist,
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

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        thumbnail: prod.thumbnail.url,
        price: prod.price,
        sale: prod.sale,
    }));
};
