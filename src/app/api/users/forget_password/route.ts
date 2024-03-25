import UserModel from "@models/userModel";
import { ForgetPassReq } from "@/types";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
    const { email } = (await req.json()) as ForgetPassReq;

    if (!email) {
        return NextResponse.json({ error: "Email Not Found!" }, { status: 401 });
    }

    const user = UserModel.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
    }
};
