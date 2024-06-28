import GridView from "@components/GridContainer";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import FeaturedProductModel from "@models/featuredProduct";
import HeroSlider from "@components/HeroSlider";
import SectionHeading from "@components/SectionHeading";
import { auth } from "@/auth";
import WishlistModel from "@models/wishlistModel";
import AboutUs from "@components/AboutUs";
import ProductCard from "@components/ProductCard";
import ProductMenu from "@components/ProductMenu";

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

interface FeaturedProductResponse {
    id: string;
    title: string;
    banner: string;
    link: string;
    linkTitle: string;
}

const fetchProducts = async (): Promise<ProductResponse[]> => {
    await startDb();

    const session = await auth();
    const userId = session?.user?.id;

    const wishlist = userId ? await WishlistModel.findOne({ user: userId }) : null;
    const wishlistProductIds = wishlist
        ? wishlist.products.map((product: string) => product.toString())
        : [];

    const products = await ProductModel.find().sort("-createdAt").limit(10).lean();

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        thumbnail: prod.thumbnail.url,
        price: prod.price,
        sale: prod.sale,
        isInWishlist: wishlistProductIds.includes(prod._id.toString()),
    }));
};

const fetchFeaturedProducts = async (): Promise<FeaturedProductResponse[]> => {
    await startDb();
    const products = await FeaturedProductModel.find().sort("-createdAt").lean();

    return products.map((prod) => ({
        id: prod._id.toString(),
        title: prod.title,
        banner: prod.banner.url,
        link: prod.link,
        linkTitle: prod.linkTitle,
    }));
};

export default async function Home() {
    const products = await fetchProducts();
    const featuredProducts = await fetchFeaturedProducts();

    return (
        <div className="space-y-6 pb-10">
            <HeroSlider products={featuredProducts} />
            <AboutUs />
            <SectionHeading title="Featured" subTitle="Products" />
            <GridView>
                {products.slice(0, 5).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </GridView>
            <ProductMenu />
            <SectionHeading title="Trending" subTitle="Now" />
            <GridView>
                {products.slice(5, 10).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </GridView>
        </div>
    );
}
