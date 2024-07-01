"use client";

import { useState, useEffect } from "react";
import GridView from "@components/GridContainer";
import HeroSlider from "@components/HeroSlider";
import SectionHeading from "@components/SectionHeading";
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

interface HomeClientProps {
    initialProducts: ProductResponse[];
    initialFeaturedProducts: FeaturedProductResponse[];
}

const HomeClient: React.FC<HomeClientProps> = ({ initialProducts, initialFeaturedProducts }) => {
    const [loading, setLoading] = useState(true);

    useState<FeaturedProductResponse[]>(initialFeaturedProducts);

    useEffect(() => {
        if (initialProducts.length && initialFeaturedProducts.length) {
            setLoading(false);
        }
    }, [initialProducts, initialFeaturedProducts]);

    return (
        <div className="space-y-6 pb-10">
            <HeroSlider products={initialFeaturedProducts} loading={loading} />
            <AboutUs />
            <SectionHeading title="Featured" subTitle="Products" />
            <GridView>
                {initialProducts.slice(0, 5).map((product) => (
                    <ProductCard key={product.id} product={product} loading={loading} />
                ))}
            </GridView>
            <ProductMenu />
            <SectionHeading title="Trending" subTitle="Now" />
            <GridView>
                {initialProducts.slice(5, 10).map((product) => (
                    <ProductCard key={product.id} product={product} loading={loading} />
                ))}
            </GridView>
        </div>
    );
};

export default HomeClient;
