import { auth } from "@/auth";
import Navbar from "@components/Navbar/Navbar";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const GuestLayout = async ({ children }: Props) => {
    const session = await auth();

    if (session) {
        return redirect("/");
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default GuestLayout;
