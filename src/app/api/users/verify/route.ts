import EmailVerificationToken from "@models/emailVerification";
import { EmailVerifyRequest } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import UserModel from "@models/userModel";
import crypto from "crypto";
import { sendEmail } from "@/app/lib/email";

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

        const verifyToken = await EmailVerificationToken.findOne({ user: userId });
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

        await EmailVerificationToken.findByIdAndDelete(verifyToken._id);
        return NextResponse.json({ message: "Your email is verified" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Something Wrong!!, Email can not be verified" },
            { status: 500 }
        );
    }
};

export const GET = async (req: Request) => {
    try {
        console.log(req.url.split("?userId="));
        const userId = req.url.split("?userId=")[1];

        if (!isValidObjectId(userId)) {
            return NextResponse.json({ error: "Invalid Request Missing User ID" }, { status: 401 });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid Request Missing User Not Found" },
                { status: 401 }
            );
        }
        if (user.verified) {
            return NextResponse.json({ error: "User Already Verified" }, { status: 401 });
        }
        const token = crypto.randomBytes(36).toString("hex");

        await EmailVerificationToken.create({
            user: user._id,
            token,
        });

        const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${userId}`;

        sendEmail({
            profile: { name: user.name, email: user.email },
            subject: "verification",
            linkUrl: verificationUrl,
        });
        return NextResponse.json({ message: "Please check your email" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Something Wrong!!, Email can not be verified" },
            { status: 500 }
        );
    }
};
