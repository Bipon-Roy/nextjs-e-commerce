import GridView from "@/components/GridContainer";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ProductCard from "@/components/ProductCard";
import ProductMenu from "@/components/ProductMenu";

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

const fetchProductsByCategory = async (category: string) => {
    await startDb();
    const products = await ProductModel.find({ category }).sort("-createdAt");
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

interface Props {
    params: {
        category: string;
    };
}
export default async function ProductByCategories({ params }: Props) {
    const products = await fetchProductsByCategory(params.category);
    const parsedProducts = JSON.parse(products) as ProductResponse[];

    return (
        <div className="space-y-4 mt-6">
            <ProductMenu />
            {parsedProducts.length ? (
                <GridView>
                    {parsedProducts.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </GridView>
            ) : (
                <h1 className="text-center pt-10 font-semibold text-2xl opacity-60">
                    Sorry there are no products in this category!
                </h1>
            )}
        </div>
    );
}
