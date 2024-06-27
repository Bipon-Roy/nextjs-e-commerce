import BuyProduct from "./BuyProduct";
import { formatPrice } from "@/utils/helper";
import ProductImageSlider from "./ProductImageSlider";
import ReviewRatings from "./ReviewRatings";
interface Props {
    title: string;
    images: string[];
    description: string;
    price: { base: number; discounted: number };
    points?: string[];
    sale: number;
    rating: number;
    outOfStock: boolean;
    isWishlist: boolean;
}

const SingleProductDetails = ({
    description,
    images,
    title,
    points,
    price,
    sale,
    rating,
    outOfStock,
}: Props) => {
    return (
        <div className="flex md:flex-row flex-col md:gap-4 gap-2 mt-6">
            <div className="flex-1">
                <ProductImageSlider images={images} />
            </div>

            <div className="flex-1 space-y-2 md:space-y-4 relative">
                <h1 className="md:text-3xl text-xl font-semibold">{title}</h1>
                <p>{description}</p>
                {rating ? <ReviewRatings value={parseFloat(rating.toFixed(1))} /> : null}

                <p className="font-semibold md:text-lg">Key Features</p>
                <div className="pl-4 space-y-2">
                    {points?.map((point, index) => {
                        return <li key={index}>{point}</li>;
                    })}
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <p className="line-through text-xl">{formatPrice(price.base)}</p>
                    <p className="font-semibold text-xl">{formatPrice(price.discounted)}</p>
                    <p className="font-medium uppercase bg-red-500 text-white py-1.5 px-3 text-xs rounded-md">
                        {`${sale}% off`}
                    </p>
                </div>

                <div className="flex py-4">
                    {outOfStock ? (
                        <p className="font-semibold text-red-500 md:text-lg">Out of stock</p>
                    ) : (
                        <BuyProduct />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;
