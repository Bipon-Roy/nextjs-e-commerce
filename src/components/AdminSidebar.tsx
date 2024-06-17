"use client";

import { ReactNode, useState } from "react";
import SignOutBtn from "./SignOutBtn";
import { IoMdPower } from "react-icons/io";
import { Drawer, IconButton } from "@material-tailwind/react";
import { AiOutlineBars } from "react-icons/ai";
import AdminPanelLinks from "./AdminPanelLinks";
interface Props {
    children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <div className="hidden  xl:flex flex-col justify-between bg-amber-300/80 h-screen sticky top-0 w-72 p-10 font-medium">
                <AdminPanelLinks />

                <SignOutBtn>
                    <div className="cursor-pointer  flex items-center gap-2 font-medium">
                        <IoMdPower className="h-4 w-4" /> Logout
                    </div>
                </SignOutBtn>
            </div>

            <Drawer open={open} onClose={() => setOpen(false)} placeholder={undefined}>
                <div className="flex flex-col justify-between h-screen w-full p-6 font-medium bg-amber-300/80">
                    <AdminPanelLinks setOpen={setOpen} />
                    <SignOutBtn>
                        <div className="cursor-pointer  flex items-center gap-2 font-medium">
                            <IoMdPower className="h-4 w-4" /> Logout
                        </div>
                    </SignOutBtn>
                </div>
            </Drawer>
            <div className="container mx-auto flex-1 p-4 overflow-y-auto">
                <IconButton
                    placeholder={undefined}
                    variant="text"
                    color="blue-gray"
                    className=" xl:hidden"
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
