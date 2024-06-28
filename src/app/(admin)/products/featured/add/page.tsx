import startDb from "@lib/db";
import FeaturedProductModel from "@models/featuredProduct";
import FeaturedProductForm from "@components/FeaturedProductForm";
import FeaturedProductTable from "@components/FeaturedProductTable";

const fetchFeaturedProducts = async () => {
    await startDb();
    const items = await FeaturedProductModel.find();
    return items.map((item) => {
        return {
            id: item._id.toString(),
            banner: item.banner.url,
            title: item.title,
            link: item.link,
            linkTitle: item.linkTitle,
        };
    });
};

const AddFeaturedProduct = async () => {
    const featuredProducts = await fetchFeaturedProducts();
    return (
        <>
            <FeaturedProductForm />
            <FeaturedProductTable products={featuredProducts} />
        </>
    );
};

export default AddFeaturedProduct;
