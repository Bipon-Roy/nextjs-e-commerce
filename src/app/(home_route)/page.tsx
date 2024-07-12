import { fetchProducts, fetchFeaturedProducts } from "@lib/fetchHomepageData";
import HomeClient from "@components/HomeClient";

export const revalidate = 60;

export default async function Home() {
    const products = await fetchProducts();
    const featuredProducts = await fetchFeaturedProducts();

    return <HomeClient initialProducts={products} initialFeaturedProducts={featuredProducts} />;
}
