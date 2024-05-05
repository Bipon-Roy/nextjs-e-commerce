import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { auth } from "@/auth";
import EmailVerificationRequest from "@/components/EmailVerificationRequest";
import ProfileForm from "@/components/ProfileForm";
import Link from "next/link";
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

const UpdateUserInfo = async () => {
    const profile = await fetchUserProfile();
    return (
        <div>
            <EmailVerificationRequest id={profile.id} verified={profile.verified} />
            <div className="flex py-4 space-y-4">
                <div className="border-r border-gray-700 p-4 space-y-4">
                    <ProfileForm
                        id={profile.id}
                        email={profile.email}
                        name={profile.name}
                        avatar={profile.avatar}
                    />
                </div>

                <div className="p-4 flex-1">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold uppercase opacity-70 mb-4">
                            Your recent orders
                        </h1>
                        <Link href="/profile/orders" className="uppercase hover:underline">
                            See all orders
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserInfo;
