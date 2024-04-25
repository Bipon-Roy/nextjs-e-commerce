import React from "react";
import BuyProduct from "./BuyProduct";
import { formatPrice } from "@/utils/helper";
import ProductImageSlider from "./ProductImageSlider";

interface Props {
    title: string;
    images: string[];
    description: string;
    price: { base: number; discounted: number };
    points?: string[];
    sale: number;
}

const SingleProductDetails = ({ description, images, title, points, price, sale }: Props) => {
    console.log(sale);

    return (
        <div className="flex lg:flex-row flex-col md:gap-4 gap-2 mt-6">
            <div className="flex-1 lg:self-start self-center">
                <ProductImageSlider images={images} />
            </div>

            <div className="flex-1 space-y-2 md:space-y-4 ">
                <h1 className="md:text-3xl text-xl font-semibold">{title}</h1>
                <p>{description}</p>

                <p className="font-semibold md:text-lg">Key Features</p>
                <div className="pl-4 space-y-2">
                    {points?.map((point, index) => {
                        return <li key={index}>{point}</li>;
                    })}
                </div>

                <div className="flex items-center space-x-2 mb-2">
                    <p className="line-through text-xl">{formatPrice(price.base)}</p>
                    <p className="font-semibold text-xl">{formatPrice(price.discounted)}</p>
                    <p className="font-bold uppercase whitespace-nowrap select-none bg-red-500 text-white py-1.5 px-3 text-xs rounded-lg">
                        {`${sale}% off`}
                    </p>
                </div>

                <div className="flex py-4">
                    <BuyProduct />
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;
