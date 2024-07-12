import {
    fetchProductDetails,
    fetchProductReviews,
    fetchSimilarProducts,
    fetchAllProductIds,
} from "./action";
import GridContainer from "@components/GridContainer";
import ProductCard from "@components/ProductCard";
import ProductReviews from "@components/ProductReviews";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import SingleProductDetails from "@components/SingleProductDetails";
import { isValidObjectId } from "mongoose";

interface Props {
    params: {
        product: string[];
    };
}

export async function generateStaticParams() {
    const productIds = await fetchAllProductIds();

    return productIds.map((productId: string) => ({
        product: ["product", productId],
    }));
}

const ProductDetails = async ({ params }: Props) => {
    const { product } = params;
    const productId = product[1];

    if (!isValidObjectId(productId)) {
        return <div>Invalid Product ID</div>;
    }

    const [productInfo, similarProducts, reviews] = await Promise.all([
        fetchProductDetails(productId),
        fetchSimilarProducts(),
        fetchProductReviews(productId),
    ]);

    if (!productInfo) {
        return <div>Product not found</div>;
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
