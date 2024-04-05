import { auth } from "@/auth";
import EmailVerificationRequest from "@/components/EmailVerificationRequest";
import Navbar from "@/components/Navbar/Navbar";

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

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                <EmailVerificationRequest />
                {children}
            </div>
        </>
    );
};

export default PrivateLayout;
