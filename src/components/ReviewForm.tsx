"use client";

import { Button, Rating } from "@material-tailwind/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import React, { useState, FormEventHandler, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
    productId: string;
    initialValue?: { rating: number; comment: string };
}

const ReviewForm = ({ productId, initialValue }: Props) => {
    const [isPending, setIsPending] = useState(false);
    const [review, setReview] = useState({
        rating: 0,
        comment: "",
    });

    const submitReview: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const { comment, rating } = review;
        if (!rating) {
            return toast.error("Rating is missing!");
        }

        setIsPending(true);
        const res = await fetch("/api/product/review", {
            method: "POST",
            body: JSON.stringify({ comment, rating, productId }),
        });

        const { error, message } = await res.json();

        setIsPending(false);

        if (!res.ok) {
            return toast.error(error);
        }

        toast.success(message);
    };

    useEffect(() => {
        if (initialValue) setReview({ ...initialValue });
    }, [initialValue]);

    return (
        <form onSubmit={submitReview} className="space-y-2">
            <div>
                <h3 className="font-semibold text-lg mb-1">Your Rating</h3>
                <Rating
                    placeholder={undefined}
                    ratedIcon={<FaStar className="h-8 w-8" />}
                    unratedIcon={<FaRegStar className="h-8 w-8" />}
                    value={initialValue?.rating || review.rating}
                    onChange={(rating) => setReview({ ...review, rating })}
                />
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-1">Write a written review</h3>
                <textarea
                    placeholder="Write what you like or dislike about the product."
                    className="w-full resize-none border p-2 rounded border-blue-gray-500 outline-blue-400 transition"
                    rows={4}
                    value={review.comment}
                    onChange={({ target }) => setReview({ ...review, comment: target.value })}
                />
            </div>

            <Button
                className="md:text-sm"
                size="md"
                placeholder={undefined}
                color="green"
                disabled={isPending}
                type="submit"
            >
                Submit
            </Button>
        </form>
    );
};

export default ReviewForm;
