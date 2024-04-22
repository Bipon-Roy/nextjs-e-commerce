import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import ProductTable, { Product } from "@/components/ProductTable";
import { redirect } from "next/navigation";

const fetchProducts = async (
    pageNo: number,
    perPage: number
): Promise<{ products: Product[]; totalCount: number }> => {
    const skipCount = (pageNo - 1) * perPage;

    await startDb();
    const [products, totalCount] = await Promise.all([
        ProductModel.find().sort("-createdAt").skip(skipCount).limit(perPage),
        ProductModel.countDocuments(),
    ]);

    const formattedProducts = products.map((p) => ({
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
    }));

    return { products: formattedProducts, totalCount };
};

const PRODUCTS_PER_PAGE = 10;

interface Props {
    searchParams: { page: string };
}

const Products = async ({ searchParams }: Props) => {
    const { page = "1" } = searchParams;

    if (isNaN(+page)) return redirect("/404");

    const { products, totalCount } = await fetchProducts(+page, PRODUCTS_PER_PAGE);

    const hasMore = parseInt(page) * PRODUCTS_PER_PAGE < totalCount;

    return (
        <div>
            <ProductTable products={products} currentPageNo={+page} hasMore={hasMore} />
        </div>
    );
};
export default Products;
