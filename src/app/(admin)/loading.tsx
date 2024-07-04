"use client";
import { Spinner } from "@material-tailwind/react";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen md:h-[80vh]">
            <Spinner className="h-12 w-12" />
        </div>
    );
};

export default LoadingSpinner;
