"use client";
import { Radio } from "@material-tailwind/react";
import React, { ReactNode, useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useRouter, useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa6";

interface Props {
    children: ReactNode;
}

const SearchFilterMenu = ({ children }: Props) => {
    const [rating, setRating] = useState([0, 5]);
    const [priceFilter, setPriceFilter] = useState("asc");
    const [applyRatingFilter, setApplyRatingFilter] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("query");
    const priceSort = searchParams.get("priceSort");

    const lowToHeight = priceSort === "asc";
    const heightToLow = priceSort === "desc";

    useEffect(() => {
        let url = `/search?query=${query}`;

        if (applyRatingFilter) {
            url += `&minRating=${rating[0]}&maxRating=${rating[1]}`;
        }

        url += `&priceSort=${priceFilter}`;
        router.push(url);
    }, [rating, priceFilter, applyRatingFilter, query, router]);

    return (
        <div className="md:flex space-y-4">
            <div className="md:border-b-0 border-b p-4 space-y-4 md:w-48 lg:w-64 lg:h-screen lg:sticky lg:top-0 z-10">
                <div>
                    <p className="font-semibold">Price</p>

                    <Radio
                        crossOrigin={undefined}
                        name="type"
                        label="Low to high"
                        defaultChecked={lowToHeight}
                        color="amber"
                        className="w-4 h-4"
                        onChange={() => setPriceFilter("asc")}
                    />

                    <Radio
                        className="w-4 h-4"
                        crossOrigin={undefined}
                        name="type"
                        label="High to low"
                        color="amber"
                        defaultChecked={heightToLow}
                        onChange={() => setPriceFilter("desc")}
                    />
                </div>

                <div>
                    <p className="font-semibold">
                        Rating {rating[0]}-{rating[1]}
                    </p>

                    <Slider
                        range
                        allowCross={false}
                        min={0}
                        max={5}
                        marks={{
                            0: (
                                <span className="flex items-center">
                                    0<FaStar className="w-3 h-3 text-yellow-700" />
                                </span>
                            ),
                            5: (
                                <span className="flex items-center">
                                    5<FaStar className="w-3 h-3 text-yellow-700" />
                                </span>
                            ),
                        }}
                        value={rating}
                        onChange={(value) => {
                            setApplyRatingFilter(true);
                            setRating(value as number[]);
                        }}
                    />
                </div>

                <div>
                    <button
                        onClick={() => {
                            setApplyRatingFilter(false);
                            setRating([0, 5]);
                            router.push("/search?query=" + query);
                        }}
                        type="button"
                        className="text-blue-gray-600 text-center w-full p-1 border rounded mt-6"
                    >
                        Clear Filter
                    </button>
                </div>
            </div>

            <div className=" flex-1">{children}</div>
        </div>
    );
};

export default SearchFilterMenu;
