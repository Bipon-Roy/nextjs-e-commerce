import UserModel from "@models/userModel";
import { ForgetPassReq } from "@/types";
import { NextResponse } from "next/server";
import PasswordResetTokenModel from "@models/passwordReset";
import crypto from "crypto";

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
};
