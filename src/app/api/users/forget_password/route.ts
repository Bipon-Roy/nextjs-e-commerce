import UserModel from "@models/userModel";
import { ForgetPassReq } from "@/types";
import { NextResponse } from "next/server";
import PasswordResetTokenModel from "@models/passwordReset";
import crypto from "crypto";
import startDb from "@lib/db";
import { sendEmail } from "@lib/email";

export const POST = async (req: Request) => {
    try {
        const { email } = (await req.json()) as ForgetPassReq;

        if (!email) {
            return NextResponse.json({ error: "Email Not Found!" }, { status: 401 });
        }

        await startDb();

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

        const resetPasswordUrl = `${process.env.PASSWORD_RESET_URL}?token=${token}&userId=${user._id}`;

        await sendEmail({
            profile: { name: user.name, email: user.email },
            subject: "forget-password",
            linkUrl: resetPasswordUrl,
        });

        return NextResponse.json({ message: "Please Check Your Email" });
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 500 });
    }
};
