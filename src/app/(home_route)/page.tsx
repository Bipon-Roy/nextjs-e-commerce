import GridView from "@/components/GridContainer";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ProductCard from "@/components/ProductCard";
import FeaturedProductModel from "@models/featuredProduct";
import HeroSlider from "@/components/HeroSlider";
import ProductMenu from "@/components/ProductMenu";

interface ProductResponse {
    id: string;
    title: string;
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
            <ProductMenu />
            <GridView>
                {parseProduct.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </GridView>
        </div>
    );
}
