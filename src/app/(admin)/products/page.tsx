import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import ProductTable, { Product } from "@/components/ProductTable";

const fetchProduct = async (pageNo: number, perPage: number): Promise<Product[]> => {
    const skipCount = (pageNo - 1) * perPage;
    await startDb();
    const products = await ProductModel.find().sort("-createdAt").skip(skipCount).limit(perPage);

    return products.map((p) => {
        return {
            id: p._id.toString(),
            title: p.title,
            thumbnail: p.thumbnail.url,
            description: p.description,
            price: {
                mrp: p.price.base,
                salePrice: p.price.discounted,
                saleOff: p.sale,
            },
            category: p.category,
            quantity: p.quantity,
        };
    });
};

const Products = async () => {
    const products = await fetchProduct(1, 10);
    return (
        <div>
            <ProductTable products={products} />
        </div>
    );
};

export default Products;
