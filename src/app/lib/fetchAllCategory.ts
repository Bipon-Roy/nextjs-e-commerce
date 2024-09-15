import ProductModel from "@models/productModel";
import startDb from "./db";

const fetchAllCategory = async () => {
    await startDb();
    const products = await ProductModel.find().select("category").lean();

    // Extract categories and remove duplicates using reduce
    const uniqueCategories = products
        .map((product) => product.category.toString())
        .reduce((acc, category) => {
            if (!acc.includes(category)) {
                acc.push(category);
            }
            return acc;
        }, [] as string[]);

    return uniqueCategories;
};

export default fetchAllCategory;
