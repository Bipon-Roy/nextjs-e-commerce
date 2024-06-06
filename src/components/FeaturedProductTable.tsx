"use client";
import { deleteFeaturedProduct } from "@/app/(admin)/products/featured/action";
import { Button, CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import truncate from "truncate";

const TABLE_HEAD = ["Detail", "Product", ""];

interface Props {
    products: Products[];
}

interface Products {
    id: string;
    banner: string;
    title: string;
    link: string;
    linkTitle: string;
}

const FeaturedProductTable = ({ products }: Props) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});
    const [error, setError] = useState<string | null>(null);

    const handleDeleteProduct = async (id: string) => {
        setIsDeleting((prevState) => ({ ...prevState, [id]: true }));
        setError(null);

        try {
            await deleteFeaturedProduct(id);
            router.refresh();
        } catch (err) {
            setError("Failed to delete product. Please try again.");
        } finally {
            setIsDeleting((prevState) => ({ ...prevState, [id]: false }));
        }
    };

    return (
        <div className="py-5">
            {error && <div className="text-red-500">{error}</div>}
            <CardBody placeholder={undefined} className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="bg-blue-500/10">
                            {TABLE_HEAD.map((head, index) => (
                                <th key={index} className="p-4">
                                    <Typography
                                        placeholder={undefined}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium leading-none"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => {
                            const { id, link, title } = item;
                            const isLast = index === products.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            const isDeletingProduct = isDeleting[id];

                            return (
                                <tr key={id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Typography
                                                placeholder={undefined}
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {truncate(title, 100)}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Link href={link}>
                                            <Typography
                                                placeholder={undefined}
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold hover:underline"
                                            >
                                                View Product
                                            </Typography>
                                        </Link>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex gap-2 items-center">
                                            <Link
                                                className="font-semibold uppercase text-xs text-blue-400 hover:underline"
                                                href={`/products/featured/update?id=${id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Button
                                                placeholder={undefined}
                                                onClick={() => handleDeleteProduct(id)}
                                                disabled={isDeletingProduct}
                                                color="red"
                                                ripple={false}
                                                variant="text"
                                                className="p-1 rounded-sm"
                                            >
                                                {isDeletingProduct ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </div>
    );
};

export default FeaturedProductTable;
