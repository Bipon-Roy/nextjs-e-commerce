import startDb from "@lib/db";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import userModel from "@models/userModel";

export const POST = async (req: Request) => {
    const body = (await req.json()) as NewUserRequest;
    await startDb();
    const newUser = await userModel.create({ ...body });

    // console.log(await newUser.comparePassword("12345678"));

    return NextResponse.json(newUser);
};
