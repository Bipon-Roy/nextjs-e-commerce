"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShoppingCart, FaShoppingBag, FaHome } from "react-icons/fa";
import SignOutBtn from "./SignOutBtn";
import { HiSparkles } from "react-icons/hi2";
import { HiCurrencyDollar } from "react-icons/hi";
interface Props {
    children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
    return (
        <div className="flex">
            <div className="flex flex-col justify-between bg-light-blue-500 h-screen sticky top-0 w-64 p-10 font-medium">
                <ul className="space-y-4 text-white">
                    <li>
                        <Link className="font-semibold text-lg text-white" href="/dashboard">
                            Ecommerce
                        </Link>
                    </li>
                    <li>
                        <Link className="flex items-center space-x-1" href="/dashboard">
                            <MdDashboardCustomize className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>
                        <hr className="w-full " />
                    </li>
                    <li>
                        <Link className="flex items-center space-x-1" href="/products">
                            <FaShoppingCart className="w-4 h-4" />
                            <span>Products</span>
                        </Link>
                        <hr className="w-full " />
                    </li>
                    <li>
                        <Link className="flex items-center space-x-1" href="/products/featured/add">
                            <HiSparkles className="w-4 h-4" />
                            <span>Featured</span>
                        </Link>
                        <hr className="w-full " />
                    </li>
                    <li>
                        <Link className="flex items-center space-x-1" href="/sales">
                            <HiCurrencyDollar className="w-4 h-4" />
                            <span>Sales</span>
                        </Link>
                        <hr className="w-full " />
                    </li>
                    <li>
                        <Link className="flex items-center space-x-1" href="/orders">
                            <FaShoppingBag className="h-4 w-4" />
                            <span>Orders</span>
                        </Link>
                        <hr className="w-full " />
                    </li>
                    <li>
                        <Link className="flex items-center space-x-1" href="/">
                            <FaHome className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                        <hr className="w-full " />
                    </li>
                </ul>

                <div>
                    <SignOutBtn>
                        <div className="cursor-pointer text-white">Logout</div>
                    </SignOutBtn>
                </div>
            </div>
            <div className="container mx-auto flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
    );
};

export default AdminSidebar;
