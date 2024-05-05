"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
    id?: string;
    verified?: boolean;
}

const EmailVerificationRequest = ({ id, verified }: Props) => {
    const [submitting, setSubmitting] = useState(false);

    const sendReverificationRequest = async () => {
        if (!id) {
            return;
        }
        setSubmitting(true);
        const res = await fetch("/api/users/verify?userId=" + id, {
            method: "GET",
        });
        const { message, error } = await res.json();
        if (!res.ok && error) {
            toast.error(error);
        }
        toast.success(message);
        setSubmitting(false);
    };

    if (verified) {
        return null;
    }

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
