import React from "react";
import PasswordResetTokenModel from "@models/passwordReset";
import startDb from "@/app/lib/db";
import { notFound } from "next/navigation";
import UpdatePassword from "@/components/UpdatePassword";

interface Props {
    searchParams: {
        token: string;
        userId: string;
    };
}
const fetchTokenValidation = async (token: string, userId: string) => {
    await startDb();
    const resetToken = await PasswordResetTokenModel.findOne({ user: userId });

    if (!resetToken) {
        return null;
    }

    const matched = await resetToken.compareToken(token);
    if (!matched) {
        return null;
    }

    return true;
};

const ResetPassword = async ({ searchParams }: Props) => {
    const { token, userId } = searchParams;
    console.log(token, userId);

    if (!token && !userId) {
        return notFound();
    }
    const isValid = await fetchTokenValidation(token, userId);

    if (!isValid) {
        return notFound();
    }

    return <UpdatePassword token={token} userId={userId} />;
};

export default ResetPassword;
