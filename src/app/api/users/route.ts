import startDb from "@lib/db";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import userModel from "@models/userModel";

export const POST = async (req: Request) => {
    const body = (await req.json()) as NewUserRequest;
    await startDb();
    await userModel.create({ ...body });
    return NextResponse.json({ message: "User Created Successfully", status: 200 });
};
