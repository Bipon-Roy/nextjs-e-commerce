"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCounter from "./CartItemCounter";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const BuyProduct = () => {
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
        </div>
    );
};

export default BuyProduct;
