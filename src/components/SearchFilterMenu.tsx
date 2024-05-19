"use client";
import { Radio } from "@material-tailwind/react";
import React, { ReactNode, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaStar } from "react-icons/fa6";
interface Props {
    children: ReactNode;
}
const SearchFilterMenu = ({ children }: Props) => {
    const [rating, setRating] = useState([0, 5]);
    return (
        <div className="md:flex gap-3 md:gap-5 py-4 space-y-4">
            <div className="md:border-b-0 border-b p-4 md:space-y-4 md:block flex space-x-8 md:space-x-0 md:w-64 h-screen lg:sticky lg:top-0">
                <div>
                    <p className="font-semibold">Price</p>

                    <Radio
                        crossOrigin={undefined}
                        name="type"
                        label="Low to heigh"
                        defaultChecked
                        color="amber"
                        className=" w-4 h-4"
                    />

                    <Radio
                        className="w-4 h-4"
                        crossOrigin={undefined}
                        name="type"
                        label="Heigh to low"
                        color="amber"
                    />
                </div>

                <div className="flex-1">
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
                        onChange={(value) => {
                            setRating(value as number[]);
                        }}
                    />
                </div>

                <div>
                    <button className="text-blue-gray-600 text-center w-full p-1 border rounded mt-6">
                        Apply Filter
                    </button>
                </div>
            </div>

            <div className="flex-1">{children}</div>
        </div>
    );
};
export default SearchFilterMenu;
