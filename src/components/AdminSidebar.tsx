"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShoppingCart, FaShoppingBag, FaHome } from "react-icons/fa";
import SignOutBtn from "./SignOutBtn";
import { HiSparkles } from "react-icons/hi2";
import { IoMdPower } from "react-icons/io";
import { usePathname } from "next/navigation";
interface Props {
    children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
    const pathname = usePathname();
    return (
        <div className="flex">
            <div className="flex flex-col justify-between bg-amber-300/80 h-screen sticky top-0 w-64 p-10 font-medium">
                <ul className="space-y-5">
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

                <div>
                    <SignOutBtn>
                        <div className="cursor-pointer  flex items-center gap-2 font-medium">
                            <IoMdPower className="h-4 w-4" /> Logout
                        </div>
                    </SignOutBtn>
                </div>
            </div>
            <div className="container mx-auto flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
    );
};

export default AdminSidebar;
