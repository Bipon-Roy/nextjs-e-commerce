import startDb from "@lib/db";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import userModel from "@models/userModel";
import nodemailer from "nodemailer";
import EmailVerificationToken from "@models/emailVerification";
import crypto from "crypto";
export const POST = async (req: Request) => {
    const body = (await req.json()) as NewUserRequest;
    await startDb();
    const newUser = await userModel.create({ ...body });

    // console.log(await newUser.comparePassword("12345678"));

    const token = crypto.randomBytes(36).toString("hex");

    await EmailVerificationToken.create({
        user: newUser._id,
        token,
    });

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d5684974437f37",
            pass: "281ab103473c82",
        },
    });

    const verificationUrl = `http://localhost:3000/verify?token=${token}&userId=${newUser._id}`;

    await transport.sendMail({
        from: "verification@nextjsecom.com",
        to: newUser.email,
        html: `<h1>Please verify your email by clicking on <a href="${verificationUrl}">this link</a></h1>`,
    });

    return NextResponse.json({ message: "Please Check Your Email" });
};
