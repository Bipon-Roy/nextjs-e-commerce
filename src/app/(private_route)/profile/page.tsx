import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { auth } from "@/auth";
import ProfileForm from "@/components/ProfileForm";
import { redirect } from "next/navigation";

const fetchUserProfile = async () => {
    const session = await auth();
    if (!session) return redirect("/auth/signin");

    await startDb();
    const user = await UserModel.findById(session.user.id);
    if (!user) return redirect("/auth/signin");
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar?.url,
        verified: user.verified,
    };
};

const page = async () => {
    const profile = await fetchUserProfile();
    return (
        <div>
            <ProfileForm
                id={profile.id}
                avatar={profile.avatar}
                email={profile.email}
                name={profile.name}
            />
        </div>
    );
};

export default page;
