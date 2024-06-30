"use client";

const ProfileSkeleton = () => {
    return (
        <div className="space-y-10 flex flex-col gap-5 md:flex-row py-4">
            {/* Skeleton for ProfileForm */}
            <div className="space-y-6">
                <div className="flex items-center justify-center">
                    <div className="h-24 w-24 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                <div className="text-sm">
                    <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="font-semibold">
                    <div className="h-12 w-full bg-gray-300 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Skeleton for RecentOrderedItems */}
            <div className="flex-1">
                <div className="py-4 space-y-4">
                    <div className="flex justify-between items-center bg-gray-200 rounded px-3 md:px-5 py-2 font-medium text-xs md:text-base">
                        <div className="h-5 w-1/3 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-5 w-1/3 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-5 w-1/3 bg-gray-300 rounded animate-pulse"></div>
                    </div>

                    <div className="flex gap-2">
                        <div className="h-12 w-12 bg-gray-300 rounded animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="flex gap-2 text-sm">
                                <div className="h-5 w-1/5 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-5 w-1/5 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right p-2 border-t text-xs md:text-base">
                        <div className="h-5 w-1/2 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
