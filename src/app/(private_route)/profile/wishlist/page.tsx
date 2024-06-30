import startDb from "@lib/db";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ObjectId } from "mongoose";
import WishlistProductCard from "@components/WishlistProductCard";

interface WishlistProduct {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
}

interface PopulatedWishlistProduct {
    _id: ObjectId;
    title: string;
    thumbnail: { url: string };
    price: { discounted: number };
}

interface Wishlist {
    _id: ObjectId;
    products: PopulatedWishlistProduct[];
}

const fetchWishlistProducts = async (): Promise<WishlistProduct[]> => {
    await startDb();
    const session = await auth();
    if (!session?.user) {
        redirect("/404");
    }

    const wishlist = await WishlistModel.findOne({ user: session.user.id })
        .populate({
            path: "products",
            select: "title thumbnail.url price.discounted",
        })
        .lean<Wishlist>();

    if (!wishlist || !wishlist.products) return [];

    return wishlist.products.map(({ _id, title, price, thumbnail }) => ({
        id: _id.toString(),
        title,
        price: price.discounted,
        thumbnail: thumbnail.url,
    }));
};

const Wishlist = async () => {
    const products = await fetchWishlistProducts();
    return (
        <div>
            {products.length ? (
                <div className="space-y-4 p-4">
                    {products.map((product) => (
                        <WishlistProductCard product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <div className="h-[350px] flex justify-center items-center">
                    <h1 className="text-2xl text-red-500 text-center p-6 font-medium">
                        There are no products inside your wishlist.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
