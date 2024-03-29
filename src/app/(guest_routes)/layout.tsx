import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const GuestLayout = async ({ children }: Props) => {
    const session = await auth();
    console.log("Guest Layout", session);

    if (session) {
        return redirect("/");
    }

    return <div>{children}</div>;
};

export default GuestLayout;
