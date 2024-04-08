"use client";

import AddProductForm from "@/components/AddProductForm";
import { NewProductInfo } from "@/types";
import { newProductInfoSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";
import { ValidationError } from "yup";

const AddProduct = () => {
    const handleAddProduct = async (values: NewProductInfo) => {
        try {
            await newProductInfoSchema.validate(values, { abortEarly: false });
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
