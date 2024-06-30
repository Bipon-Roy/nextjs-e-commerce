"use client";
const SkeletonOrderList = () => {
    const skeletonOrders = Array.from({ length: 2 }, (_, index) => index);
    const skeletonProducts = Array.from({ length: 2 }, (_, index) => index);

    return (
        <div>
            {skeletonOrders.map((orderIndex) => (
                <div key={orderIndex} className="py-4 space-y-4 animate-pulse">
                    <div className="flex justify-between items-center bg-gray-200 rounded px-3 md:px-5 py-2 font-medium text-xs md:text-base">
                        <p className="bg-gray-300 h-4 w-24 rounded"></p>
                        <p className="bg-gray-300 h-4 w-32 rounded"></p>
                        <p className="bg-gray-300 h-6 w-20 rounded-md"></p>
                    </div>

                    {skeletonProducts.map((productIndex) => (
                        <div key={productIndex} className="flex gap-2">
                            <div className="bg-gray-300 w-12 h-12 rounded"></div>
                            <div>
                                <p className="bg-gray-300 h-4 w-36 rounded"></p>
                                <div className="flex gap-2 text-sm mt-2">
                                    <p className="bg-gray-300 h-4 w-8 rounded"></p>
                                    <p className="bg-gray-300 h-4 w-4 rounded"></p>
                                    <p className="bg-gray-300 h-4 w-20 rounded"></p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-right p-2 border-t border-b text-xs md:text-base">
                        <p className="bg-gray-300 h-4 w-40 rounded ml-auto"></p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonOrderList;
