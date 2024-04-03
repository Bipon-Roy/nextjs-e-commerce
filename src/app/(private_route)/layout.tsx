import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
const PrivateLayout = async ({ children }: Props) => {
    const session = await auth();

    if (!session) {
        return redirect("/auth/signin");
    }

    return <div>{children}</div>;
};

export default PrivateLayout;
