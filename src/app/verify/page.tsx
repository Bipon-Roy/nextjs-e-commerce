"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
    searchParams: {
        token: string;
        userId: string;
    };
}

const Verify = (props: Props) => {
    const { token, userId } = props.searchParams;
    const router = useRouter();
    //verify token and userId
    useEffect(() => {
        fetch("http://localhost:3000/api/users/verify", {
            method: "POST",
            body: JSON.stringify({ token, userId }),
        }).then(async (res) => {
            const apiRes = await res.json();
            const { error, message } = apiRes as { message: string; error: string };

            if (res.ok) {
                // success
                toast.success(message);
            }

            if (!res.ok && error) {
                toast.error(error);
            }

            router.replace("/");
        });
    });
    return (
        <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
            Please wait...
            <p>We are verifying your email</p>
        </div>
    );
};

export default Verify;
