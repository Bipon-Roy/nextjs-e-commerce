"use client";

import { NewProductInfo, ProductToUpdate, SingleProductResponse } from "@/types";
import ProductForm, { InitialValue } from "./ProductForm";
import {
    removeAndUpdateProductImage,
    removeImageFromCloud,
    updateProduct,
} from "@/app/(admin)/products/action";
import { updateProductInfoSchema } from "@/utils/validationSchema";
import { ValidationError } from "yup";
import { toast } from "react-toastify";
import { extractImagePublicId, uploadImage } from "@/utils/helper";
import { useRouter } from "next/navigation";

interface Props {
    product: SingleProductResponse;
}
const UpdateProduct = ({ product }: Props) => {
    const router = useRouter();
    const initialValue: InitialValue = {
        ...product,
        thumbnail: product.thumbnail.url,
        images: product.images?.map(({ url }) => url),
        mrp: product.price.base,
        salePrice: product.price.discounted,
        bulletPoints: product.bulletPoints || [],
    };

    const handleUpdateProduct = async (values: NewProductInfo) => {
        try {
            const { thumbnail, images } = values;
            await updateProductInfoSchema.validate(values, { abortEarly: false });

            const dataToUpdate: ProductToUpdate = {
                title: values.title,
                description: values.description,
                bulletPoints: values.bulletPoints,
                category: values.category,
                quantity: values.quantity,
                price: {
                    base: values.mrp,
                    discounted: values.salePrice,
                },
            };
            //update product thumbnail
            if (thumbnail) {
                await removeImageFromCloud(product.thumbnail.id);
                const { id, url } = await uploadImage(thumbnail);
                dataToUpdate.thumbnail = { id, url };
            }
            //update product images
            if (images.length) {
                const uploadPromise = images.map(async (imgFile) => {
                    return await uploadImage(imgFile);
                });

                dataToUpdate.images = await Promise.all(uploadPromise);
            }

            //update product
            await updateProduct(product.id, dataToUpdate);
            router.refresh();
            toast.success("Product updated successfully!");
        } catch (error) {
            if (error instanceof ValidationError) {
                // console.log(error.inner);
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    };

    const handleImageRemove = (source: string) => {
        const imagePublicId = extractImagePublicId(source);
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
