import { auth } from "@/auth";
import AdminSidebar from "@/components/AdminSidebar";

import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const AdminLayout = async ({ children }: Props) => {
    const session = await auth();
    const user = session?.user;
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
        return redirect("/auth/signin");
    }

    return (
        <>
            <AdminSidebar>{children}</AdminSidebar>
        </>
    );
};

export default AdminLayout;
