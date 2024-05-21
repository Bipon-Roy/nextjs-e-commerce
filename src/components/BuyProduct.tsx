"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCounter from "./CartItemCounter";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
interface Props {
    wishlist?: boolean;
}
const BuyProduct = ({ wishlist }: Props) => {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();
    const { product } = useParams();
    const { loggedIn } = useAuth();
    const router = useRouter();
    const productId = product[1];

    const handleIncrement = () => {
        setQuantity((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        if (quantity === 0) return;
        setQuantity((prevCount) => prevCount - 1);
    };

    const addToCart = async () => {
        if (!productId) return;

        if (!loggedIn) return router.push("/auth/signin");

        const res = await fetch("/api/product/cart", {
            method: "POST",
            body: JSON.stringify({ productId, quantity }),
        });

        const { error } = await res.json();

        if (!res.ok && error) {
            toast.error(error);
        }
        router.refresh();
    };

    const handleWishlist = async () => {
        if (!productId) return;

        if (!loggedIn) return router.push("/auth/signin");

        const res = await fetch("/api/product/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
        });

        const { error, message } = await res.json();

        if (!res.ok && error) {
            toast.error(error);
        } else {
            toast.success(message);
        }
        router.refresh();
    };
    return (
        <div className="flex items-center space-x-4">
            <CartCounter
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                value={quantity}
            />

            <Button
                className="rounded-md bg-blue-500 "
                onClick={() => startTransition(async () => await addToCart())}
                placeholder={undefined}
                disabled={isPending}
            >
                Add to Cart
            </Button>
            <Button placeholder={undefined} className=" bg-orange-500 rounded-3xl">
                Buy Now
            </Button>
            <div className="absolute top-0 right-0">
                <Button
                    onClick={() => startTransition(async () => await handleWishlist())}
                    variant="text"
                    placeholder={undefined}
                    disabled={isPending}
                    className="rounded hover:bg-red-500/10 text-red-500 p-2"
                >
                    {wishlist ? (
                        <FaHeart className="w-5 h-5 text-red-600" />
                    ) : (
                        <FaRegHeart className="w-5 h-5" />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default BuyProduct;
