import GridView from "@/components/GridContainer";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import ProductCard from "@/components/ProductCard";
import FeaturedProductModel from "@models/featuredProduct";
import HeroSlider from "@/components/HeroSlider";
import ProductMenu from "@/components/ProductMenu";
import SectionHeading from "@/components/SectionHeading";
import { auth } from "@/auth";
import WishlistModel from "../models/wishlistModel";

interface ProductResponse {
    id: string;
    title: string;
    thumbnail: string;
    price: {
        base: number;
        discounted: number;
    };
    sale: number;
    isInWishlist: boolean;
}

const fetchProducts = async () => {
    await startDb();
    const session = await auth();
    const userId = session?.user?.id;

    const wishlist = userId ? await WishlistModel.findOne({ user: userId }) : null;
    const wishlistProductIds = wishlist
        ? wishlist.products.map((product: string) => product.toString())
        : [];

    const products = await ProductModel.find().sort("-createdAt").limit(20);

    const productList = products.map((prod) => {
        return {
            id: prod._id.toString(),
            title: prod.title,
            thumbnail: prod.thumbnail.url,
            price: prod.price,
            sale: prod.sale,
            isInWishlist: wishlistProductIds.includes(prod._id.toString()),
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
        <div className="space-y-6 pb-10">
            <HeroSlider products={featuredProducts} />
            <SectionHeading title="Featured" subTitle="Products" />
            <GridView>
                {parseProduct.slice(0, 5).map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </GridView>
            <ProductMenu />
            <SectionHeading title="Trending" subTitle="Now" />
            <GridView>
                {parseProduct.slice(5, 10).map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </GridView>
        </div>
    );
}
