"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { formatPrice } from "@/utils/helper";
import CartItemCounter from "./CartItemCounter";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

export interface Product {
    id: string;
    thumbnail: string;
    title: string;
    price: number;
    totalPrice: number;
    qty: number;
}

interface CartItemsProps {
    products: Product[];
    cartTotal: number;
    totalQty: number;
    cartId: string;
}

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(publishableKey);

const CartItems = ({ products = [], totalQty, cartTotal, cartId }: CartItemsProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const updateCart = async (productId: string, quantity: number) => {
        setLoading(true);
        await fetch("/api/product/cart", {
            method: "POST",
            body: JSON.stringify({
                productId,
                quantity,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setLoading(false);
        router.refresh();
    };

    const handleCheckout = async () => {
        setLoading(true);
        const stripe = await stripePromise;
        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify({ cartId }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { error, url } = await res.json();
        if (error) {
            toast.error(error);
            setLoading(false);
            return;
        }

        if (stripe && url) {
            window.location.href = url;
        }

        setLoading(false);
    };

    return (
        <div className="mt-5 md:mt-10">
            <div className="space-y-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="grid grid-cols-4 gap-2 md:gap-4 items-center justify-between shadow-sm py-2 rounded px-4 border"
                    >
                        <Image src={product.thumbnail} alt={product.title} height={80} width={80} />
                        <p className="font-semibold">{formatPrice(product.totalPrice)}</p>
                        <CartItemCounter
                            onIncrement={() => updateCart(product.id, 1)}
                            onDecrement={() => updateCart(product.id, -1)}
                            value={product.qty}
                            disabled={loading}
                        />
                        <div className="text-end mr-2">
                            <button
                                onClick={() => updateCart(product.id, -product.qty)}
                                disabled={loading}
                                className="text-red-500 p-1 hover:bg-gray-200 transition-all"
                                style={{ opacity: loading ? "0.5" : "1" }}
                            >
                                <MdDelete size={20} className="text-red-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-end items-end space-y-4 mt-4 mr-1">
                <div className="flex justify-end gap-4 text-blue-gray-900">
                    <p className="font-semibold text-2xl">Total</p>
                    <div>
                        <p className="font-semibold text-2xl">{formatPrice(cartTotal)}</p>
                        <p className="text-right text-sm">{totalQty} items</p>
                    </div>
                </div>
                <Button
                    size="md"
                    onClick={handleCheckout}
                    placeholder={undefined}
                    className="shadow-none hover:shadow-none focus:shadow-none focus:scale-105 active:scale-100"
                    color="orange"
                    disabled={loading}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
};

export default CartItems;
