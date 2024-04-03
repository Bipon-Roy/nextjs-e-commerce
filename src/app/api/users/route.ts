import startDb from "@lib/db";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import userModel from "@models/userModel";
import EmailVerificationToken from "@models/emailVerification";
import crypto from "crypto";
import { sendEmail } from "@lib/email";

export const POST = async (req: Request) => {
    const body = (await req.json()) as NewUserRequest;
    await startDb();
    const newUser = await userModel.create({ ...body });

    const token = crypto.randomBytes(36).toString("hex");

    await EmailVerificationToken.create({
        user: newUser._id,
        token,
    });

    const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${newUser._id}`;

    sendEmail({
        profile: { name: newUser.name, email: newUser.email },
        subject: "verification",
        linkUrl: verificationUrl,
    });

    return NextResponse.json({ message: "Please Check Your Email" });
};
