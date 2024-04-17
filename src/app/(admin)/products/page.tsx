import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import ProductTable, { Product } from "@/components/ProductTable";
import { redirect } from "next/navigation";

const fetchProducts = async (pageNo: number, perPage: number): Promise<Product[]> => {
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

const PRODUCTS_PER_PAGE = 10;

interface Props {
    searchParams: { page: string };
}
const Products = async ({ searchParams }: Props) => {
    const { page = "1" } = searchParams;

    if (isNaN(+page)) return redirect("/404");

    const products = await fetchProducts(+page, PRODUCTS_PER_PAGE);
    let hasMore = true;

    if (products.length < PRODUCTS_PER_PAGE) hasMore = false;
    else hasMore = true;
    return (
        <div>
            <ProductTable products={products} currentPageNo={+page} hasMore={hasMore} />
        </div>
    );
};

export default Products;
