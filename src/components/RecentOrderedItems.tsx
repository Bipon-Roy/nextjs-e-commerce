"use client";
import Image from "next/image";
import React from "react";
import dateFormat from "dateformat";
import { Chip } from "@material-tailwind/react";
import { formatPrice } from "../utils/helper";

type product = {
    id: string;
    title: string;
    thumbnail: string;
    totalPrice: number;
    price: number;
    qty: number;
};

export interface Orders {
    id: any;
    products: product[];
    paymentStatus: string;
    date: string;
    total: number;
    deliveryStatus: "ordered" | "delivered" | "shipped";
}

const RecentOrderedItems = ({ orders }: { orders: Orders[] }) => {
    return (
        <div>
            {orders.map((order) => {
                return (
                    <div key={order.id} className="py-4 space-y-4">
                        <div className="flex justify-between items-center bg-brown-100 rounded px-3 md:px-5 py-2 font-medium">
                            <p>ORDERED ON {dateFormat(order.date, "ddd mmm dd yyyy")}</p>
                            <p>TOTAL {formatPrice(order.total)}</p>
                            <p className="capitalize px-4 py-1 bg-amber-300 rounded">
                                {order.paymentStatus}
                            </p>
                        </div>

                        {order.products.map((p) => {
                            return (
                                <div key={p.id} className="flex space-x-2">
                                    <Image src={p.thumbnail} width={50} height={50} alt={p.title} />
                                    <div>
                                        <p>{p.title}</p>
                                        <div className="flex space-x-2 text-sm">
                                            <p className="font-medium">Qty-{p.qty}</p>
                                            <p className="font-medium">
                                                Price {formatPrice(p.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="text-right p-2 border-t">
                            <p>
                                Order Status:{" "}
                                <span className="font-semibold uppercase">
                                    {order.deliveryStatus}
                                </span>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecentOrderedItems;
