import ProductModel from "@models/productModel";
import startDb from "./db";

const fetchAllProductIds = async () => {
    await startDb();
    const products = await ProductModel.find().select("_id").lean();
    return products.map((product) => product._id.toString());
};

export default fetchAllProductIds;
