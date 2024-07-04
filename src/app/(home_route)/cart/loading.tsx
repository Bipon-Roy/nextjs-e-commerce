"use client";
import React from "react";

const SkeletonCartItems = () => {
    const skeletonProducts = Array.from({ length: 2 }, (_, index) => index);

    return (
        <div className="mt-5 md:mt-10">
            <div className="space-y-4">
                {skeletonProducts.map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-4 gap-1 md:gap-4 items-center justify-between shadow-sm py-2 rounded px-4 border animate-pulse"
                    >
                        <div className="w-20 h-20 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded w-16 ml-2 md:ml-0"></div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        </div>
                        <div className="text-end">
                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-end items-end space-y-4 mt-4 mr-1 animate-pulse">
                <div className="flex justify-end gap-4 text-blue-gray-900">
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                    <div>
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded w-10 mt-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCartItems;
