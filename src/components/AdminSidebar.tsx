"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShoppingCart, FaShoppingBag, FaHome } from "react-icons/fa";
import SignOutBtn from "./SignOutBtn";
import { HiSparkles } from "react-icons/hi2";
import { IoMdPower } from "react-icons/io";
import { usePathname } from "next/navigation";
import { Drawer, IconButton } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
interface Props {
    children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <div className="hidden lg:flex flex-col justify-between bg-amber-300/80 h-screen sticky top-0 w-72 p-10 font-medium">
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

            <Drawer open={open} onClose={() => setOpen(false)} placeholder={undefined}>
                <div className="flex flex-col justify-between bg-amber-300/80 h-screen sticky top-0 w-full p-10 font-medium">
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
            </Drawer>
            <div className="container mx-auto flex-1 p-4 overflow-y-auto">
                <IconButton
                    placeholder={undefined}
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpen(!open)}
                >
                    <AiOutlineBars className="h-6 w-6" />
                </IconButton>
                {children}
            </div>
        </div>
    );
};

export default AdminSidebar;
