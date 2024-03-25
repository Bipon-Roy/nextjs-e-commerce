import PasswordResetTokenModel from "@models/emailVerification";
import { EmailVerifyRequest } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import UserModel from "@models/userModel";

export const POST = async (req: Request) => {
    try {
        const { token, userId } = (await req.json()) as EmailVerifyRequest;

        console.log(token, userId);

        if (!isValidObjectId(userId) || !token) {
            return NextResponse.json(
                { error: "Invalid Request, userId and token is required" },
                { status: 401 }
            );
        }

        const verifyToken = await PasswordResetTokenModel.findOne({ user: userId });
        console.log(verifyToken);

        if (!verifyToken) {
            return NextResponse.json({ error: "Invalid Request" }, { status: 401 });
        }

        const isVerified = await verifyToken.compareToken(token);

        if (!isVerified) {
            return NextResponse.json(
                { error: "Invalid token, token doesn't match!" },
                { status: 401 }
            );
        }

        await UserModel.findByIdAndUpdate(userId, {
            verified: true,
        });

        await PasswordResetTokenModel.findByIdAndDelete(verifyToken._id);
        return NextResponse.json({ message: "Your email is verified" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Something Wrong!!, Email can not be verified" },
            { status: 500 }
        );
    }
};
