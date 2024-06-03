import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton, Typography } from "@material-tailwind/react";

import { MdDashboardCustomize } from "react-icons/md";
import { FaShoppingCart, FaShoppingBag, FaHome } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

interface Props {
    setOpen?: (open: boolean) => void;
}

const AdminPanelLinks = ({ setOpen }: Props) => {
    const pathname = usePathname();

    return (
        <ul className="space-y-5">
            <li>
                {setOpen && (
                    <div className="flex items-center justify-between lg:absolute">
                        <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                            Admin Panel
                        </Typography>
                        <IconButton
                            placeholder={undefined}
                            size="sm"
                            variant="text"
                            onClick={() => setOpen(false)}
                            className="text-red-500 "
                        >
                            <IoClose className="h-5 w-5 " />
                        </IconButton>
                    </div>
                )}
            </li>
            <li>
                <Link
                    className={`flex items-center gap-1 ${
                        pathname === "/dashboard"
                            ? "pr-4 pl-2 py-1 bg-blue-500 text-white rounded"
                            : ""
                    }`}
                    href="/dashboard"
                >
                    <MdDashboardCustomize className="w-4 h-4" />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link
                    className={`flex items-center gap-1 ${
                        pathname === "/products" || pathname === "/products/create"
                            ? "pr-4 pl-2 py-1 bg-blue-500 text-white rounded"
                            : ""
                    }`}
                    href="/products"
                >
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Products</span>
                </Link>
            </li>
            <li>
                <Link
                    className={`flex items-center gap-1 ${
                        pathname === "/products/featured/add"
                            ? "pr-4 pl-2 py-1 bg-blue-500 text-white rounded"
                            : ""
                    }`}
                    href="/products/featured/add"
                >
                    <HiSparkles className="w-4 h-4" />
                    <span>Featured</span>
                </Link>
            </li>
            <li>
                <Link
                    className={`flex items-center gap-1 ${
                        pathname === "/orders"
                            ? "pr-4 pl-2 py-1 bg-blue-500 text-white rounded"
                            : ""
                    }`}
                    href="/orders"
                >
                    <FaShoppingBag className="h-4 w-4" />
                    <span>Orders</span>
                </Link>
            </li>
            <li>
                <Link className="flex items-center gap-1" href="/">
                    <FaHome className="h-4 w-4" />
                    <span>Home</span>
                </Link>
            </li>
        </ul>
    );
};

export default AdminPanelLinks;
