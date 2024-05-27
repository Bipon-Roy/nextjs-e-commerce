"use client";
import React, { useState, useTransition } from "react";
import { Button, Input } from "@material-tailwind/react";
import ProfileAvatar from "./ProfileAvatar";
import { toast } from "react-toastify";
import { uploadImage } from "@/utils/helper";
import { UserInfoUpdate } from "@/types";
import { updateUserProfile } from "@/app/(private_route)/profile/action";
import { useRouter } from "next/navigation";

interface Props {
    avatar?: string;
    name: string;
    email: string;
    id: string;
}

const ProfileForm = ({ id, name, avatar, email }: Props) => {
    const [avatarFile, setAvatarFile] = useState<File>();
    const [userName, setUserName] = useState(name);
    const [isPending, startTransition] = useTransition();
    const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;
    const showSubmitButton = avatarSource !== avatar || userName !== name;
    const router = useRouter();
    const UpdateUserInfo = async () => {
        if (userName.trim().length < 3) {
            return toast.error("Username must be valid");
        }

        const user: UserInfoUpdate = {
            id,
            name: userName,
        };

        if (avatarFile) {
            const avatar = await uploadImage(avatarFile);
            user.avatar = avatar;
        }
        await updateUserProfile(user);
        toast.success("Successfully Updated");
        router.refresh();
    };
    return (
        <form
            action={() =>
                startTransition(async () => {
                    await UpdateUserInfo();
                })
            }
            className="space-y-6"
        >
            <ProfileAvatar onChange={setAvatarFile} nameInitial={name[0]} avatar={avatarSource} />
            <div className="text-sm">Email: {email}</div>
            <Input
                crossOrigin={undefined}
                onChange={({ target }) => setUserName(target.value)}
                label="Name"
                color="blue"
                value={userName}
                className="font-semibold"
            />
            {showSubmitButton ? (
                <Button
                    placeholder={undefined}
                    type="submit"
                    className="w-full shadow-none hover:shadow-none hover:scale-[0.98]"
                    color="blue"
                    disabled={isPending}
                >
                    {isPending ? "Submitting.." : "Submit"}
                </Button>
            ) : null}
        </form>
    );
};

export default ProfileForm;
