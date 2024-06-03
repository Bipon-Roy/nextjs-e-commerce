"use client";

import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import {
    Typography,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Button,
} from "@material-tailwind/react";
import truncate from "truncate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchForm from "@components/SearchForm";
import { FaPlus } from "react-icons/fa";
import { formatPrice } from "@/utils/helper";

export interface Product {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    price: {
        mrp: number;
        salePrice: number;
        saleOff: number;
    };
    category: string;
    quantity: number;
}

const TABLE_HEAD = ["Product", "MRP", "Sale Price", "Quantity", "Category", "Action"];

interface Props {
    products: Product[];
    currentPageNo: number;
    hasMore?: boolean;
    showPageNavigator?: boolean;
}

const ProductTable = (props: Props) => {
    const router = useRouter();
    const { products = [], currentPageNo, hasMore, showPageNavigator = true } = props;
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleOnPrevPress = () => {
        const prevPage = currentPageNo - 1;
        if (prevPage > 0) router.push(`/products?page=${prevPage}`);
    };

    const handleOnNextPress = () => {
        const nextPage = currentPageNo + 1;
        router.push(`/products?page=${nextPage}`);
    };

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="py-5">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                    <Typography placeholder={undefined} variant="h5" color="blue-gray">
                        Products
                    </Typography>
                </div>
                <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <SearchForm onSearch={handleSearch} />
                    <Link
                        href="/products/create"
                        className="flex items-center gap-1 min-w-fit px-2 md:px-4 bg-blue-500 text-white rounded-md font-semibold"
                    >
                        <FaPlus className="h-4 w-4" /> <span>Add New</span>
                    </Link>
                </div>
            </div>
            <CardBody placeholder={undefined} className="px-0">
                {filteredProducts.length ? (
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="bg-blue-500/10">
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="p-4">
                                        <p className="font-semibold text-xs md:text-base text-blue-gray-900">
                                            {head}
                                        </p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((item, index) => {
                                const { id, thumbnail, title, price, quantity, category } = item;
                                const isLast = index === filteredProducts.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    placeholder={undefined}
                                                    src={thumbnail}
                                                    alt={title}
                                                    size="md"
                                                    variant="rounded"
                                                />
                                                <Link href={`/${title}/${id}`}>
                                                    <Typography
                                                        placeholder={undefined}
                                                        variant="small"
                                                        className="font-semibold text-blue-gray-800 hover:text-blue-500 transition-all"
                                                    >
                                                        {truncate(title, 30)}
                                                    </Typography>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                placeholder={undefined}
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formatPrice(price.mrp)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                placeholder={undefined}
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {formatPrice(price.salePrice)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Typography
                                                    placeholder={undefined}
                                                    variant="small"
                                                    color="blue-gray"
                                                >
                                                    {quantity}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Typography
                                                    placeholder={undefined}
                                                    variant="small"
                                                    color="blue-gray"
                                                >
                                                    {category}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Link href={`/products/update/${id}`}>
                                                <IconButton
                                                    placeholder={undefined}
                                                    variant="text"
                                                    color="blue-gray"
                                                >
                                                    <HiPencil className="h-4 w-4" />
                                                </IconButton>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="my-3 text-red-500 font-semibold md:text-lg text-center">
                        No products available!
                    </p>
                )}
            </CardBody>
            {showPageNavigator && filteredProducts.length ? (
                <CardFooter
                    placeholder={undefined}
                    className="flex items-center justify-center border-t border-blue-gray-50 p-4"
                >
                    <div className="flex items-center gap-2">
                        <Button
                            placeholder={undefined}
                            disabled={currentPageNo === 1}
                            onClick={handleOnPrevPress}
                            variant="text"
                        >
                            Previous
                        </Button>
                        <Button
                            placeholder={undefined}
                            disabled={!hasMore}
                            onClick={handleOnNextPress}
                            variant="text"
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            ) : null}
        </div>
    );
};

export default ProductTable;
