"use client";

import GridContainer from "@/components/GridContainer";
import SkeletonCard from "@/components/SkeletonCard";

import { memo } from "react";

interface Props {
    className: string;
}

const LoadingCategories = memo(() => {
    return (
        <div className="space-y-6 mt-6 lg:mt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 w-[180px] h-[150px] md:w-[240px] md:h-[180px] xl:w-[300px] xl:h-[170px] animate-pulse rounded-lg"
                    />
                ))}
            </div>
            <GridContainer>
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="">
                        <SkeletonCard />
                    </div>
                ))}
            </GridContainer>
        </div>
    );
});

LoadingCategories.displayName = "LoadingCategories";
export default LoadingCategories;
