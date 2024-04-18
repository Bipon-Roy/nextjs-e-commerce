import GridView from "@/components/GridView";
import startDb from "../lib/db";
import ProductModel from "../models/productModel";
import ProductCard from "@/components/ProductCard";

interface ProductResponse {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    price: {
        base: number;
        discounted: number;
    };
    sale: number;
}

const fetchProducts = async () => {
    await startDb();
    const products = await ProductModel.find().sort("-createdAt").limit(20);
    const productList = products.map((prod) => {
        return {
            id: prod._id.toString(),
            title: prod.title,
            description: prod.description,
            category: prod.category,
            thumbnail: prod.thumbnail.url,
            price: prod.price,
            sale: prod.sale,
        };
    });

    return JSON.stringify(productList);
};
export default async function Home() {
    const products = await fetchProducts();
    const parseProduct = JSON.parse(products) as ProductResponse[];
    return (
        <GridView>
            {parseProduct.map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
        </GridView>
    );
}
