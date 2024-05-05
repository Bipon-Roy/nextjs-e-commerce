"use client";

import { Spinner } from "@material-tailwind/react";

const RootLoadingSkeleton = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Spinner color="blue" className="h-10 w-10 md:h-14 md:w-14" />
        </div>
    );
};

export default RootLoadingSkeleton;
