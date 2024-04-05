import { auth } from "@/auth";
import Navbar from "@/components/Navbar/Navbar";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const HomeLayout = async ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 xl:px-0">{children}</div>
        </>
    );
};

export default HomeLayout;
