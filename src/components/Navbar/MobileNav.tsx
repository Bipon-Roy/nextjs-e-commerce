import React from "react";
import {
    Drawer,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

import { IoMdPower } from "react-icons/io";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { MenuItems } from "@/types/index";
import SignOutBtn from "../SignOutBtn";
import { IoClose } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
interface Props {
    open: boolean;
    onClose(): void;
    menuItems: MenuItems[];
}

const MobileNav = ({ open, onClose, menuItems }: Props) => {
    const { isAdmin, loggedIn } = useAuth();
    return (
        <>
            <Drawer open={open} onClose={onClose} placeholder={undefined}>
                <div className="mb-2 flex items-center justify-between p-4 z-50">
                    <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                        Next.Js E-Shop
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={onClose}
                        placeholder={undefined}
                    >
                        <IoClose className="h-5 w-5" />
                    </IconButton>
                </div>
                <List placeholder={undefined}>
                    {menuItems.map(({ href, icon, label }) => {
                        return (
                            <Link key={href} href={href}>
                                <ListItem onClick={onClose} placeholder={undefined}>
                                    <ListItemPrefix placeholder={undefined}>{icon}</ListItemPrefix>
                                    {label}
                                </ListItem>
                            </Link>
                        );
                    })}

                    {isAdmin ? (
                        <Link href="/dashboard">
                            <ListItem onClick={onClose} placeholder={undefined}>
                                <ListItemPrefix placeholder={undefined}>
                                    <MdDashboardCustomize className="h-4 w-4" />
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                        </Link>
                    ) : null}

                    {loggedIn ? (
                        <SignOutBtn>
                            <ListItem placeholder={undefined}>
                                <ListItemPrefix placeholder={undefined}>
                                    <IoMdPower className="h-5 w-5" />
                                </ListItemPrefix>
                                Sign Out
                            </ListItem>
                        </SignOutBtn>
                    ) : (
                        <div className="mx-2 flex gap-2 items-center">
                            <Link
                                className="px-4 py-1 flex-1 bg-gray-200 font-medium rounded text-center"
                                href="/auth/signin"
                            >
                                Sign in
                            </Link>
                            <Link
                                className="bg-blue-500 flex-1 text-white px-4 py-1 rounded text-center"
                                href="/auth/signup"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </List>
            </Drawer>
        </>
    );
};

export default MobileNav;
