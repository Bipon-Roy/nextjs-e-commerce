import startDb from "@lib/db";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import userModel from "@models/userModel";
import nodemailer from "nodemailer";
export const POST = async (req: Request) => {
    const body = (await req.json()) as NewUserRequest;
    await startDb();
    const newUser = await userModel.create({ ...body });

    // console.log(await newUser.comparePassword("12345678"));

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d5684974437f37",
            pass: "281ab103473c82",
        },
    });

    await transport.sendMail({
        from: "verification@nextjsecom.com",
        to: newUser.email,
        html: `<h1>Please verify your email by clicking on <a href='http://localhost:3000'>this link</a></h1>`,
    });

    return NextResponse.json(newUser);
};
