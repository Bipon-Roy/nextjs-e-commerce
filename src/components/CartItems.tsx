"use client";
import React, { useState } from "react";

import Image from "next/image";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import { formatPrice } from "@/utils/helper";
import CartItemCounter from "./CartItemCounter";
import { useRouter } from "next/navigation";

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
}

const CartItems = ({ products = [], totalQty, cartTotal }: CartItemsProps) => {
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
        });
        setLoading(false);
        router.refresh();
    };

    return (
        <div className="mt-10">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="py-4">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    height={50}
                                    width={50}
                                />
                            </td>
                            <td className="py-4">{product.title}</td>
                            <td className="py-4 font-semibold">
                                {formatPrice(product.totalPrice)}
                            </td>
                            <td className="py-4">
                                <CartItemCounter
                                    onIncrement={() => updateCart(product.id, 1)}
                                    onDecrement={() => updateCart(product.id, -1)}
                                    value={product.qty}
                                    disabled={loading}
                                />
                            </td>
                            <td className="py-4 text-right">
                                <button
                                    onClick={() => updateCart(product.id, -product.qty)}
                                    disabled={loading}
                                    className="text-red-500"
                                    style={{ opacity: loading ? "0.5" : "1" }}
                                >
                                    <FaRegCircleXmark className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col justify-end items-end space-y-4">
                <div className="flex justify-end space-x-4 text-blue-gray-800">
                    <p className="font-semibold text-2xl">Total</p>
                    <div>
                        <p className="font-semibold text-2xl">{formatPrice(cartTotal)}</p>
                        <p className="text-right text-sm">{totalQty} items</p>
                    </div>
                </div>
                <Button
                    placeholder={undefined}
                    className="shadow-none hover:shadow-none  focus:shadow-none focus:scale-105 active:scale-100"
                    color="green"
                    disabled={loading}
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
};

export default CartItems;
