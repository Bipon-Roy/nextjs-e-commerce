import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import SingleProductDetails from "@/components/SingleProductDetails";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";

interface Props {
    params: {
        product: string[];
    };
}

const fetchProductDetails = async (id: string) => {
    if (!isValidObjectId(id)) return redirect("404");

    await startDb();
    const productInfo = await ProductModel.findById(id);
    if (!productInfo) return redirect("404");

    return JSON.stringify({
        id: productInfo._id.toString(),
        title: productInfo.title,
        description: productInfo.description,
        thumbnail: productInfo.thumbnail.url,
        images: productInfo.images?.map(({ url }) => url),
        bulletPoints: productInfo.bulletPoints,
        price: productInfo.price,
    });
};

const ProductDetails = async ({ params }: Props) => {
    const { product } = params;
    const productId = product[1];
    const productInfo = JSON.parse(await fetchProductDetails(productId));

    return (
        <div>
            <SingleProductDetails
                title={productInfo.title}
                price={productInfo.price}
                description={productInfo.description}
                sale={productInfo.sale}
                points={productInfo.bulletPoints}
            />
        </div>
    );
};

export default ProductDetails;
