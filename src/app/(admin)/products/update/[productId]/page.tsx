import ProductModel from "@models/productModel";
import startDb from "@lib/db";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import UpdateProduct from "@/components/UpdateProduct";
import { SingleProductResponse } from "@/types";
import fetchAllProductIds from "@lib/fetchAllProductIds";

interface Props {
    params: {
        productId: string;
    };
}

export async function generateStaticParams() {
    const productIds = await fetchAllProductIds();
    return productIds.map((id) => ({ productId: id }));
}

const fetchProductInfo = async (productId: string): Promise<string> => {
    if (!isValidObjectId(productId)) {
        return redirect("/404");
    }
    await startDb();

    const product = await ProductModel.findById(productId);

    if (!product) {
        return redirect("/404");
    }

    const productData: SingleProductResponse = {
        id: product._id.toString(),
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        bulletPoints: product.bulletPoints,
        images: product.images?.map(({ url, id }) => ({ url, id })),
        thumbnail: product.thumbnail,
        category: product.category,
    };
    return JSON.stringify(productData);
};

const page = async (props: Props) => {
    const { productId } = props.params;
    const product = await fetchProductInfo(productId);

    return <UpdateProduct product={JSON.parse(product)} />;
};

export default page;
