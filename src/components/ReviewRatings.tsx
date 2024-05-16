"use client";

import { Rating } from "@material-tailwind/react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
    rating: number;
}

const ReviewRatings = ({ rating }: Props) => {
    return (
        <Rating
            placeholder={undefined}
            ratedIcon={<FaStar className="h-8 w-8" />}
            unratedIcon={<FaRegStar className="h-8 w-8" />}
            value={rating}
            readonly
        />
    );
};

export default ReviewRatings;
