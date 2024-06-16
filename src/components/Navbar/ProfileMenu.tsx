import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { IoIosArrowDown, IoMdPower } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { MenuItems } from "@/types/index";
import SignOutBtn from "../SignOutBtn";

interface Props {
    menuItems: MenuItems[];
    avatar?: string;
}
const ProfileMenu = ({ menuItems, avatar }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const { isAdmin } = useAuth();
    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    placeholder={undefined}
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        placeholder={undefined}
                        variant="circular"
                        size="sm"
                        alt="candice wu"
                        className="border border-blue-500 p-0.5"
                        src={avatar || "/avatar.png"}
                    />
                    <IoIosArrowDown
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>

            <MenuList className="p-1" placeholder={undefined}>
                {menuItems.map(({ href, icon, label }) => {
                    return (
                        <Link key={href} href={href} className="outline-none">
                            <MenuItem
                                placeholder={undefined}
                                onClick={closeMenu}
                                className="flex items-center gap-2 rounded"
                            >
                                {icon}
                                <span>{label}</span>
                            </MenuItem>
                        </Link>
                    );
                })}

                {isAdmin ? (
                    <Link href="/dashboard" className="outline-none">
                        <MenuItem
                            placeholder={undefined}
                            onClick={closeMenu}
                            className="flex items-center gap-2 rounded"
                        >
                            <MdDashboardCustomize className="h-4 w-4" />
                            <span>Dashboard</span>
                        </MenuItem>
                    </Link>
                ) : null}

                <MenuItem placeholder={undefined}>
                    <SignOutBtn>
                        <p className="flex items-center gap-2 rounded">
                            <IoMdPower className="h-4 w-4" />
                            <span>Sign Out</span>
                        </p>
                    </SignOutBtn>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;
