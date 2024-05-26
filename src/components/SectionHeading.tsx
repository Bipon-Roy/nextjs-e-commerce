"use client";
import { Typography } from "@material-tailwind/react";

interface Props {
    title: string;
    subTitle: string;
}
const SectionHeading = ({ title, subTitle }: Props) => {
    return (
        <Typography
            placeholder={undefined}
            variant="h4"
            color="blue-gray"
            className="text-center font-semibold py-1"
        >
            {title} <span className="text-orange-400">{subTitle}</span>
        </Typography>
    );
};

export default SectionHeading;
