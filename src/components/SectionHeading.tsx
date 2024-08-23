"use client";
import { Typography } from "@material-tailwind/react";

interface Props {
    title: string;
    subTitle: string;
}

const SectionHeading = ({ title, subTitle }: Props) => {
    return (
        <div className="text-center">
            <Typography
                placeholder={undefined}
                variant="h3"
                color="black"
                className="font-semibold py-1"
            >
                {title} <span>{subTitle}</span>
            </Typography>
            <div className="w-16 h-1 bg-orange-600 mx-auto mt-1"></div>
        </div>
    );
};

export default SectionHeading;
