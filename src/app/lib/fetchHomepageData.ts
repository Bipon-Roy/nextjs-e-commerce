import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import FeaturedProductModel from "@models/featuredProduct";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";

interface ProductResponse {
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

interface FeaturedProductResponse {
    id: string;
    title: string;
    banner: string;
    link: string;
    linkTitle: string;
}

export const fetchProducts = async (): Promise<ProductResponse[]> => {
    await startDb();

    const session = await auth();
    const userId = session?.user?.id;

    const wishlist = userId ? await WishlistModel.findOne({ user: userId }) : null;
    const wishlistProductIds = wishlist
        ? wishlist.products.map((product: string) => product.toString())
        : [];

    const products = await ProductModel.find().sort("-createdAt").limit(10).lean();

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        thumbnail: prod.thumbnail.url,
        price: prod.price,
        sale: prod.sale,
        isInWishlist: wishlistProductIds.includes(prod._id.toString()),
    }));
};

export const fetchFeaturedProducts = async (): Promise<FeaturedProductResponse[]> => {
    await startDb();
    const products = await FeaturedProductModel.find().sort("-createdAt").lean();

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        banner: prod.banner.url,
        link: prod.link,
        linkTitle: prod.linkTitle,
    }));
};
