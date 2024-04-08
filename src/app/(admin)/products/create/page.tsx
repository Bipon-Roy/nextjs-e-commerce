"use client";

import AddProductForm from "@/components/AddProductForm";
import { NewProductInfo } from "@/types";

const AddProduct = () => {
    const handleAddProduct = (values: NewProductInfo) => {};
    return (
        <>
            <AddProductForm onSubmit={handleAddProduct} />
        </>
    );
};

export default AddProduct;
