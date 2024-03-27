import UserModel from "@models/userModel";
import { ForgetPassReq } from "@/types";
import { NextResponse } from "next/server";
import PasswordResetTokenModel from "@models/passwordReset";
import crypto from "crypto";
import nodemailer from "nodemailer";
const POST = async (req: Request) => {
    const { email } = (await req.json()) as ForgetPassReq;

    if (!email) {
        return NextResponse.json({ error: "Email Not Found!" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
        return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
    }

    //generating token and send password reset link
    await PasswordResetTokenModel.findOneAndDelete({ user: user._id });

    const token = crypto.randomBytes(36).toString("hex");
    await PasswordResetTokenModel.create({
        user: user._id,
        token,
    });

    //send link to the given url

    const resetPasswordUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${user._id}`;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d5684974437f37",
            pass: "281ab103473c82",
        },
    });

    await transport.sendMail({
        from: "verification@nextjsecom.com",
        to: user.email,
        html: `<h1>Please click on the link to reset your password <a href="${resetPasswordUrl}">this link</a></h1>`,
    });

    return NextResponse.json({ message: "Please Check Your Email" });
};
