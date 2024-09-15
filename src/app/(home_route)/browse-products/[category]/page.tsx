import GridContainer from "@components/GridContainer";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ProductCard from "@components/ProductCard";
import ProductMenu from "@components/ProductMenu";
import { auth } from "@/auth";
import WishlistModel from "@models/wishlistModel";
import { Document } from "mongoose";
import fetchAllCategory from "@lib/fetchAllCategory";

interface ProductResponse {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    price: {
        base: number;
        discounted: number;
    };
    sale: number;
    isInWishlist: boolean;
}

interface Wishlist extends Document {
    products: string[];
}

const fetchProductsByCategory = async (category: string): Promise<ProductResponse[]> => {
    await startDb();
    const session = await auth();
    const userId = session?.user?.id;
    const wishlist: Wishlist | null = userId ? await WishlistModel.findOne({ user: userId }).lean() : null;
    const wishlistProductIds = wishlist ? wishlist.products.map((product) => product.toString()) : [];

    const products = await ProductModel.find({ category }).sort("-createdAt").lean();

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        description: prod.description,
        category: prod.category,
        thumbnail: prod.thumbnail.url,
        price: prod.price,
        sale: prod.sale,
        isInWishlist: wishlistProductIds.includes(prod._id.toString()),
    }));
};

interface Props {
    params: {
        category: string;
    };
}
export async function generateStaticParams() {
    const category = await fetchAllCategory();
    console.log("category", category);

    return category;
}

const ProductByCategories = async ({ params }: Props) => {
    const products = await fetchProductsByCategory(params.category);

    return (
        <div className="space-y-4 mt-6">
            <ProductMenu />
            {products.length ? (
                <GridContainer>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </GridContainer>
            ) : (
                <div>
                    <h1 className="text-center pt-10 font-semibold text-2xl opacity-60">
                        Sorry, there are no products in this category!
                    </h1>
                </div>
            )}
        </div>
    );
};

export default ProductByCategories;
