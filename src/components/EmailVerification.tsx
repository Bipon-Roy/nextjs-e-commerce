"use client";

import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

const EmailVerificationRequest = () => {
    const { profile } = useAuth();

    const sendReverificationRequest = async () => {
        if (profile) {
            const res = await fetch("http://localhost:3000/api/users/verify?userId=" + profile.id, {
                method: "GET",
            });
            const { message, error } = await res.json();
            if (!res.ok && error) {
                toast.error(error);
            }

            toast.success(message);
        }
    };

    if (profile?.verified) {
        return null;
    }
    return (
        <div className="p-2 text-center bg-blue-50">
            <span>{`It looks like you haven't verified your email.`}</span>
            <button
                // onClick={sendReverificationRequest}
                className="ml-2 font-semibold underline"
            >
                Get verification link
            </button>
        </div>
    );
};

export default EmailVerificationRequest;
