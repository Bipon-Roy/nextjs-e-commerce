"use client";

import { ProductResponse } from "@/types";
import ProductForm, { InitialValue } from "./ProductForm";
import { removeAndUpdateProductImage } from "@/app/(admin)/products/action";

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

    const handleUpdateProduct = () => {};

    const handleImageRemove = (source: string) => {
        const spiltData = source.split("/");
        const lastItem = spiltData[spiltData.length - 1];
        const imagePublicId = lastItem.split(".")[0];
        removeAndUpdateProductImage(product.id, imagePublicId);
    };

    return (
        <ProductForm
            onImageRemove={handleImageRemove}
            initialValue={initialValue}
            onSubmit={handleUpdateProduct}
        />
    );
};

export default UpdateProduct;
