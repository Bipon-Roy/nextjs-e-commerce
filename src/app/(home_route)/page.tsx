import GridView from "@/components/GridContainer";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ProductCard from "@/components/ProductCard";
import FeaturedProductModel from "@models/featuredProduct";
import HeroSlider from "@/components/HeroSlider";
import HorizontalMenu from "@/components/HorizontalMenu";

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

const fetchFeaturedProducts = async () => {
    await startDb();
    const products = await FeaturedProductModel.find().sort("-createdAt");
    return products.map((prod) => {
        return {
            id: prod._id.toString(),
            title: prod.title,
            banner: prod.banner.url,
            link: prod.link,
            linkTitle: prod.linkTitle,
        };
    });
};

export default async function Home() {
    const products = await fetchProducts();
    const featuredProducts = await fetchFeaturedProducts();
    const parseProduct = JSON.parse(products) as ProductResponse[];

    return (
        <div className="space-y-4">
            <HeroSlider products={featuredProducts} />
            <HorizontalMenu />
            <GridView>
                {parseProduct.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </GridView>
        </div>
    );
}
