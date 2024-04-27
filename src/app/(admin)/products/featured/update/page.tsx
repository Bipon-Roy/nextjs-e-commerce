import startDb from "@/app/lib/db";
import FeaturedProductModel from "@/app/models/featuredProduct";
import FeaturedProductForm from "@/components/FeaturedProductForm";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";

interface Props {
    searchParams: { id: string };
}

const fetchFeaturedProduct = async (id: string) => {
    if (!isValidObjectId(id)) return redirect("/404");
    await startDb();
    const product = await FeaturedProductModel.findById(id);
    if (!product) return redirect("/404");
    const { _id, title, banner, link, linkTitle } = product;

    return {
        id: _id.toString(),
        title,
        banner: banner.url,
        link,
        linkTitle,
    };
};

const UpdateFeaturedProduct = async ({ searchParams }: Props) => {
    const { id } = searchParams;
    const product = await fetchFeaturedProduct(id);
    return (
        <>
            <FeaturedProductForm initialValue={product} />
        </>
    );
};

export default UpdateFeaturedProduct;
