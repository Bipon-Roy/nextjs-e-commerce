"use server";

import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { UserInfoUpdate } from "@/types";

export const updateUserProfile = async (user: UserInfoUpdate) => {
    try {
        await startDb();
        await UserModel.findByIdAndUpdate(user.id, {
            name: user.name,
            avatar: user.avatar,
        });
    } catch (error) {
        console.log("Update User Profile Info", error);

        throw error;
    }
};
