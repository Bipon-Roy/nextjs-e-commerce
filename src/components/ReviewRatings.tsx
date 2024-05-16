"use client";

import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
    value: number;
}

const ReviewRatings = ({ value }: Props) => {
    const data = Array(5).fill("");
    const fullStarts = Math.floor(value);
    const halfStar = value - fullStarts >= 0.1;
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center space-x-0.5">
                {data.map((_, index) => {
                    return index + 1 <= fullStarts ? (
                        <FaStar className="h-5 w-5 text-amber-500" key={index} />
                    ) : halfStar && index === fullStarts ? (
                        <FaStarHalfAlt className="h-5 w-5 text-amber-500" key={index} />
                    ) : (
                        <FaRegStar className="h-5 w-5 text-amber-500" key={index} />
                    );
                })}
            </div>
            <p className="font-semibold ">{value}</p>
        </div>
    );
};

export default ReviewRatings;
