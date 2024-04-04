"use client";

import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const EmailVerificationRequest = () => {
    const { profile } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    console.log(profile);

    const sendReverificationRequest = async () => {
        if (!profile) {
            return;
        }
        setSubmitting(true);
        const res = await fetch("http://localhost:3000/api/users/verify?userId=" + profile.id, {
            method: "GET",
        });
        const { message, error } = await res.json();
        if (!res.ok && error) {
            toast.error(error);
        }
        toast.success(message);
        setSubmitting(false);
    };

    return (
        <div className="p-2 text-center bg-gray-100 mt-5">
            <span>{`It looks like you haven't verified your email.`}</span>
            <button
                disabled={submitting}
                onClick={sendReverificationRequest}
                className="ml-2 font-semibold underline"
            >
                {submitting ? "Generating link..." : " Get verification link"}
            </button>
        </div>
    );
};

export default EmailVerificationRequest;
