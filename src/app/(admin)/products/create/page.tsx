"use client";

import AddProductForm from "@/components/ProductForm";
import { NewProductInfo } from "@/types";
import { uploadImage } from "@/utils/helper";
import { newProductInfoSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import { createProduct } from "../action";
import { useRouter } from "next/navigation";

const AddProduct = () => {
    const router = useRouter();

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
            router.refresh();
            router.push("/products");
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
