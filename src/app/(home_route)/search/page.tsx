import ProductCard, { Product } from "@components/ProductCard";

import startDb from "@lib/db";
import ProductModel, { ProductDocument } from "@models/productModel";
import { FilterQuery } from "mongoose";
import React from "react";

import SearchFilterMenu from "@/components/SearchFilterMenu";

type options = {
    query: string;
    priceSort?: "asc" | "desc";
    maxRating?: number;
    minRating?: number;
};

interface Props {
    searchParams: options;
}

const searchProducts = async (options: options) => {
    const { query, maxRating, minRating, priceSort } = options;
    await startDb();

    const filter: FilterQuery<ProductDocument> = {
        title: { $regex: query, $options: "i" },
    };

    if (typeof minRating === "number" && typeof maxRating === "number") {
        const minCondition = minRating >= 0;
        const maxCondition = maxRating <= 5;
        if (minCondition && maxCondition) {
            filter.rating = { $gte: minRating, $lte: maxRating };
        }
    }

    const products = await ProductModel.find({
        ...filter,
    }).sort({ "price.discounted": priceSort === "asc" ? 1 : -1 });

    const productList = products.map((product) => {
        return {
            id: product._id.toString(),
            title: product.title,
            description: product.description,
            category: product.category,
            thumbnail: product.thumbnail.url,
            price: product.price,
            sale: product.sale,
            rating: product.rating,
        };
    });

    return JSON.stringify(productList);
};

const SearchProduct = async ({ searchParams }: Props) => {
    const { maxRating, minRating } = searchParams;

    const results = JSON.parse(
        await searchProducts({
            ...searchParams,
            maxRating: maxRating ? +maxRating : undefined,
            minRating: minRating ? +minRating : undefined,
        })
    ) as Product[];

    const noProducts = !results.length;

    return (
        <div>
            <SearchFilterMenu>
                {noProducts ? (
                    <h1 className="text-xl font-semibold text-blue-gray-500 text-center">
                        No product found
                    </h1>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
                        {results.map((product) => {
                            return <ProductCard key={product.id} product={product} />;
                        })}
                    </div>
                )}
            </SearchFilterMenu>
        </div>
    );
};
export default SearchProduct;
