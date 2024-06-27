import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ReviewModel from "@models/reviewModel";
import WishlistModel from "@models/wishlistModel";
import { auth } from "@/auth";
import GridContainer from "@components/GridContainer";
import ProductCard from "@components/ProductCard";
import ProductReviews from "@components/ProductReviews";
import { ObjectId, isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowCircleRight } from "react-icons/fa";
import SingleProductDetails from "@components/SingleProductDetails";

interface Props {
    params: {
        product: string[];
    };
}
interface ProductResponse {
    id: string;
    title: string;
    thumbnail: string;
    price: {
        base: number;
        discounted: number;
    };
    sale: number;
}
const fetchProductDetails = async (id: string) => {
    if (!isValidObjectId(id)) return redirect("404");

    await startDb();
    const productInfo = await ProductModel.findById(id);
    if (!productInfo) return redirect("404");

    return JSON.stringify({
        id: productInfo._id.toString(),
        title: productInfo.title,
        description: productInfo.description,
        thumbnail: productInfo.thumbnail.url,
        images: productInfo.images?.map(({ url }) => url),
        bulletPoints: productInfo.bulletPoints,
        price: productInfo.price,
        sale: productInfo.sale,
        rating: productInfo.rating,
        outOfStock: productInfo.quantity <= 0,
    });
};

const fetchProductReviews = async (productId: string) => {
    await startDb();
    const reviews = await ReviewModel.find({ product: productId }).populate<{
        userId: { _id: ObjectId; name: string; avatar?: { url: string } };
    }>({
        path: "userId",
        select: "name avatar.url",
    });

    const result = reviews.map((data) => ({
        id: data._id.toString(),
        rating: data.rating,
        comment: data.comment,
        date: data.createdAt,
        userInfo: {
            id: data.userId._id.toString(),
            name: data.userId.name,
            avatar: data.userId.avatar?.url,
        },
    }));

    return JSON.stringify(result);
};

const fetchSimilarProducts = async () => {
    await startDb();
    const products = await ProductModel.find().sort({ rating: -1 }).limit(5);
    const session = await auth();
    const userId = session?.user?.id;

    const wishlist = userId ? await WishlistModel.findOne({ user: userId }) : null;
    const wishlistProductIds = wishlist
        ? wishlist.products.map((product: string) => product.toString())
        : [];
    const productList = products.map((prod) => {
        return {
            id: prod._id.toString(),
            title: prod.title,
            thumbnail: prod.thumbnail.url,
            price: prod.price,
            sale: prod.sale,
            isInWishlist: wishlistProductIds.includes(prod._id.toString()),
        };
    });

    return JSON.stringify(productList);
};

const ProductDetails = async ({ params }: Props) => {
    const { product } = params;
    const productId = product[1];
    const productInfo = JSON.parse(await fetchProductDetails(productId));
    let productImages = [productInfo.thumbnail];

    if (productInfo.images) {
        productImages = productImages.concat(productInfo.images);
    }
    const similarProducts = await fetchSimilarProducts();
    const parseProduct = JSON.parse(similarProducts) as ProductResponse[];
    const reviews = await fetchProductReviews(productId);
    return (
        <div>
            <SingleProductDetails
                title={productInfo.title}
                price={productInfo.price}
                description={productInfo.description}
                sale={productInfo.sale}
                points={productInfo.bulletPoints}
                images={productImages}
                rating={productInfo.rating}
                outOfStock={productInfo.outOfStock}
                isWishlist={productInfo.isWishlist}
            />

            <div className="py-4 space-y-4 mt-3">
                <div className="flex justify-between items-center border-b-2 p-2">
                    <h1 className="text-xl font-semibold mb-2">Reviews</h1>
                    <Link
                        className=" text-blue-500 rounded-md font-medium px-3 text-sm md:text-base flex items-center gap-1"
                        href={`/add-review/${productInfo.id}`}
                    >
                        ADD REVIEW <FaArrowCircleRight />
                    </Link>
                </div>
            </div>
            <ProductReviews reviews={JSON.parse(reviews)} />
            <h1 className="text-2xl text-center font-semibold mb-6">Product you may like</h1>
            <GridContainer>
                {parseProduct.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </GridContainer>
        </div>
    );
};

export default ProductDetails;
