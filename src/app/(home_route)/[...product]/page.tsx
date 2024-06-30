import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ReviewModel from "@models/reviewModel";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";
import GridContainer from "@components/GridContainer";
import ProductCard from "@components/ProductCard";
import ProductReviews, { Review } from "@components/ProductReviews";
import { ObjectId, isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowCircleRight } from "react-icons/fa";
import SingleProductDetails from "@components/SingleProductDetails";
import { Types } from "mongoose";

interface Props {
    params: {
        product: string[];
    };
}

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

const fetchProductDetails = async (id: string): Promise<ProductResponse | null> => {
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

const fetchProductReviews = async (productId: string): Promise<Review[]> => {
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

const fetchSimilarProducts = async (): Promise<SimilarProductResponse[]> => {
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

const ProductDetails = async ({ params }: Props) => {
    const { product } = params;
    const productId = product[1];

    if (!isValidObjectId(productId)) {
        return redirect("404");
    }

    await startDb();

    const [productInfo, similarProducts, reviews] = await Promise.all([
        fetchProductDetails(productId),
        fetchSimilarProducts(),
        fetchProductReviews(productId),
    ]);

    if (!productInfo) {
        return redirect("404");
    }

    const productImages = [productInfo.thumbnail, ...(productInfo.images || [])];

    return (
        <div>
            <SingleProductDetails
                title={productInfo.title}
                price={productInfo.price}
                description={productInfo.description}
                points={productInfo.bulletPoints}
                images={productImages}
                rating={productInfo.rating}
                outOfStock={productInfo.outOfStock}
            />

            <div className="py-4 space-y-4 mt-3">
                <div className="flex justify-between items-center border-b-2 p-2">
                    <h1 className="text-xl font-semibold mb-2">Reviews</h1>
                    <Link
                        className="text-blue-500 rounded-md font-medium px-3 text-sm md:text-base flex items-center gap-1"
                        href={`/add-review/${productInfo.id}`}
                    >
                        ADD REVIEW <FaArrowCircleRight />
                    </Link>
                </div>
            </div>
            <ProductReviews reviews={reviews} />
            <h1 className="text-2xl text-center font-semibold mb-6">Products you may like</h1>
            <GridContainer>
                {similarProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </GridContainer>
        </div>
    );
};

export default ProductDetails;
