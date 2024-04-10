"use client";

import AddProductForm from "@/components/AddProductForm";
import { NewProductInfo } from "@/types";
import { uploadImage } from "@/utils/helper";
import { newProductInfoSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";
import { ValidationError, string } from "yup";
import { createProduct } from "../action";

const AddProduct = () => {
    const handleAddProduct = async (values: NewProductInfo) => {
        try {
            const { thumbnail, images } = values;
            await newProductInfoSchema.validate(values, { abortEarly: false });

            const thumbnailRes = await uploadImage(thumbnail!);
            let productImages: { url: string; id: string }[] = [];

            if (images) {
                const uploadRes = images.map(async (imageFile) => {
                    const { id, url } = await uploadImage(imageFile);
                    return { id, url };
                });

                productImages = await Promise.all(uploadRes);
            }

            await createProduct({
                ...values,
                price: {
                    base: values.mrp,
                    discounted: values.salePrice,
                },
                thumbnail: thumbnailRes,
                images: productImages,
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                // console.log(error.inner);
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    };
    return (
        <>
            <AddProductForm onSubmit={handleAddProduct} />
        </>
    );
};

export default AddProduct;
