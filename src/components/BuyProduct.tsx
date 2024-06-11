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

        const { error, message } = await res.json();
        if (!res.ok && error) {
            toast.error(error);
        } else {
            toast.success(message);
        }
        router.refresh();
    };

    const handleCheckout = async () => {
        const res = await fetch("/api/checkout/instant", {
            method: "POST",
            body: JSON.stringify({ productId: productId }),
        });

        const { error, url } = await res.json();

        if (!res.ok) {
            toast.error(error);
        } else {
            // open the checkout url
            window.location.href = url;
        }
    };

    return (
        <div className="flex items-center gap-4">
            <CartCounter
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                value={quantity}
            />

            <Button
                size="sm"
                className="rounded-md bg-blue-500"
                onClick={() => startTransition(async () => await addToCart())}
                placeholder={undefined}
                disabled={isPending}
            >
                Add to Cart
            </Button>
            <Button
                size="sm"
                disabled={isPending}
                onClick={() => {
                    startTransition(async () => await handleCheckout());
                }}
                placeholder={undefined}
                className=" bg-orange-500 rounded-3xl"
            >
                Buy Now
            </Button>
        </div>
    );
};

export default BuyProduct;
