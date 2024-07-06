"use client";
import { memo } from "react";

const SkeletonHeroSlider = memo(() => {
    return (
        <div className="h-[320px] md:h-[500px] mt-4 rounded-md bg-gray-300 animate-pulse relative">
            <div className="absolute inset-0 p-5">
                <div className="w-[65%] md:w-1/2 h-full flex flex-col items-start justify-center space-y-2">
                    <div className="h-4 w-3/4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="h-10 md:h-8 w-1/5 bg-gray-400 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
});
SkeletonHeroSlider.displayName = "SkeletonHeroSlider";
export default SkeletonHeroSlider;
