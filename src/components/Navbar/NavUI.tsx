"use client";
import Link from "next/link";
import { HiShoppingBag } from "react-icons/hi2";
import { Navbar, IconButton, Spinner } from "@material-tailwind/react";
import { FaRegHeart } from "react-icons/fa6";
import ProfileMenu from "./ProfileMenu";
import MobileNav from "./MobileNav";
import CartIcon from "./CartIcon";
import { FaRegUserCircle, FaShoppingBag } from "react-icons/fa";
import useAuth from "@hooks/useAuth";
import { useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import NavSearchForm from "../NavSearchForm";
import { IoClose } from "react-icons/io5";

interface Props {
    cartItemsCount: number;
    avatar?: string;
}

export const menuItems = [
    {
        href: "/profile",
        icon: <FaRegUserCircle className="h-4 w-4" />,
        label: "My Profile",
    },
    {
        href: "/profile/orders",
        icon: <FaShoppingBag className="h-4 w-4" />,
        label: "Orders",
    },
    {
        href: "/profile/wishlist",
        icon: <FaRegHeart className="h-4 w-4" />,
        label: "Wishlist",
    },
];

const NavUI = ({ cartItemsCount, avatar }: Props) => {
    const [open, setOpen] = useState(false);
    const { loading, loggedIn } = useAuth();

    useEffect(() => {
        const onResize = () => window.innerWidth >= 960 && setOpen(false);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return (
        <>
            <Navbar
                placeholder={undefined}
                className="mx-auto max-w-7xl p-4 xl:px-0 rounded"
                shadow={false}
            >
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link className="flex items-center gap-1" href="/">
                        <HiShoppingBag className="w-10 h-10 text-orange-600" />
                        <p className="text-xs font-semibold mt-[6px] hidden lg:block">
                            Next.js <span className="block">E-Shop</span>
                        </p>
                    </Link>
                    <div className="w-full md:w-96 mx-4 md:mx-0 ">
                        <NavSearchForm submitTo="/search?query=" />
                    </div>

                    <div className="hidden lg:flex gap-2 items-center">
                        <CartIcon cartItems={cartItemsCount} />
                        {loggedIn ? (
                            <ProfileMenu menuItems={menuItems} avatar={avatar} />
                        ) : loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <Link
                                    className="px-4 py-1 bg-gray-200 font-medium rounded"
                                    href="/auth/signin"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    className="bg-blue-500 text-white px-4 py-1 rounded font-medium"
                                    href="/auth/signup"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                        <CartIcon cartItems={cartItemsCount} />

                        <IconButton
                            placeholder={undefined}
                            variant="text"
                            color="blue-gray"
                            className="lg:hidden"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <IoClose className="h-6 w-6" />
                            ) : (
                                <AiOutlineBars className="h-6 w-6" />
                            )}
                        </IconButton>
                    </div>
                </div>
            </Navbar>
            <div className="lg:hidden">
                <MobileNav menuItems={menuItems} onClose={() => setOpen(false)} open={open} />
            </div>
        </>
    );
};

export default NavUI;
