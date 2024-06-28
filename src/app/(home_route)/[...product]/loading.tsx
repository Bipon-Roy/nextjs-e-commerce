"use client";

import { Typography } from "@material-tailwind/react";
import { memo } from "react";

interface Props {
    className: string;
}
const SkeletonLoader = ({ className }: Props) => (
    <Typography
        placeholder={undefined}
        as="div"
        variant="paragraph"
        className={`bg-gray-300 ${className}`}
    >
        &nbsp;
    </Typography>
);

const LoadingSingleProduct = memo(() => {
    return (
        <div className="flex md:flex-row flex-col md:gap-4 gap-2 mt-6 p-4 animate-pulse">
            <div className="flex-1">
                {/* Placeholder for image slider */}
                <div className="w-full aspect-square">
                    <div className="grid h-full w-full place-items-center  bg-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-12 w-12 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Placeholder for image gallery */}
                <div className="flex items-center gap-4 my-4">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="grid w-20 h-20 place-items-center  bg-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-12 w-12 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 space-y-2 md:space-y-4 relative">
                {/* Placeholder for title */}
                <SkeletonLoader className="h-8 w-1/2" />

                {/* Placeholder for description */}
                <div className="space-y-2">
                    <SkeletonLoader className="h-4 w-full" />
                    <SkeletonLoader className="h-4 w-full" />
                    <SkeletonLoader className="h-4 w-3/4" />
                </div>

                {/* Placeholder for rating */}
                <SkeletonLoader className="h-4 w-1/4" />

                {/* Placeholder for key features */}
                <div className="space-y-2">
                    <SkeletonLoader className="h-4 w-1/3" />
                    <div className="pl-4 space-y-2">
                        <SkeletonLoader className="h-4 w-full" />
                        <SkeletonLoader className="h-4 w-full" />
                        <SkeletonLoader className="h-4 w-full" />
                    </div>
                </div>

                {/* Placeholder for pricing */}
                <div className="flex items-center gap-2 mb-2">
                    <SkeletonLoader className="h-6 w-1/4" />
                    <SkeletonLoader className="h-6 w-1/4" />
                    <SkeletonLoader className="h-6 w-1/4" />
                </div>

                {/* Placeholder for stock status */}
                <div className="flex py-4">
                    <SkeletonLoader className="h-8 w-1/3" />
                </div>
            </div>
        </div>
    );
});

LoadingSingleProduct.displayName = "LoadingSingleProduct";
export default LoadingSingleProduct;
