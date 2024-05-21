import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import WishlistProductCard from "@/components/WishlistProductCard";
import { ObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

const fetchWishlistProducts = async () => {
    const session = await auth();
    if (!session?.user) return redirect("/404");

    const wishlist = await WishlistModel.findOne<{
        products: [
            {
                _id: ObjectId;
                title: string;
                thumbnail: { url: string };
                price: { discounted: number };
            }
        ];
    }>({
        user: session.user.id,
    }).populate({
        path: "products",
        select: "title thumbnail.url price.discounted",
    });

    if (!wishlist) return [];

    return wishlist?.products.map(({ _id, title, price, thumbnail }) => {
        return {
            id: _id.toString(),
            title,
            price: price.discounted,
            thumbnail: thumbnail.url,
        };
    });
};
const Wishlist = async () => {
    const products = await fetchWishlistProducts();
    return (
        <div>
            {products.length ? (
                <div className="space-y-4 p-4">
                    {products.map((product) => {
                        return <WishlistProductCard product={product} key={product.id} />;
                    })}
                </div>
            ) : (
                <h1 className="text-2xl text-red-500 text-center p-6 font-medium">
                    There is no products inside your wishlist.
                </h1>
            )}
        </div>
    );
};

export default Wishlist;
