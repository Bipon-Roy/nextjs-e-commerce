"use client";
import { memo } from "react";
import { Button } from "@material-tailwind/react";

const SkeletonHeroSlider = memo(() => {
    const skeletonProducts = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className="h-[320px] md:h-[450px] mt-4 rounded-md">
            {skeletonProducts.map((_, index) => (
                <div className="select-none relative mb-4 animate-pulse" key={index}>
                    <div className="w-full h-[320px] md:h-[450px] bg-gray-300 rounded-md" />
                    <div className="absolute inset-0 p-5">
                        <div className="w-[65%] md:w-1/2 h-full flex flex-col items-start justify-center space-y-2">
                            <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-2"></div>
                            <Button
                                placeholder={undefined}
                                disabled
                                tabIndex={-1}
                                className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                            >
                                &nbsp;
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});
SkeletonHeroSlider.displayName = "SkeletonHeroSlider";
export default SkeletonHeroSlider;
