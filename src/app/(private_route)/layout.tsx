import { auth } from "@/auth";
import EmailVerificationRequest from "@/components/EmailVerificationRequest";

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
        <div className="max-w-7xl mx-auto">
            <EmailVerificationRequest />
            {children}
        </div>
    );
};

export default PrivateLayout;
