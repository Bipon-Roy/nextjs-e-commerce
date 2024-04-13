"use client";

import { ProductResponse } from "@/types";
import ProductForm, { InitialValue } from "./ProductForm";

interface Props {
    product: ProductResponse;
}
const UpdateProduct = ({ product }: Props) => {
    const initialValue: InitialValue = {
        ...product,
        thumbnail: product.thumbnail.url,
        images: product.images?.map(({ url }) => url),
        mrp: product.price.base,
        salePrice: product.price.discounted,
        bulletPoints: product.bulletPoints || [],
    };
    return <ProductForm initialValue={initialValue} />;
};

export default UpdateProduct;
