import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import UserModel from "@/app/models/userModel";
import { auth } from "@/auth";
import EmailVerificationRequest from "@/components/EmailVerificationRequest";
import ProfileForm from "@/components/ProfileForm";
import RecentOrderedItems from "@/components/RecentOrderedItems";

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
const fetchOrderInfo = async () => {
    const session = await auth();

    if (!session?.user) {
        return redirect("/auth/signin");
    }

    await startDb();
    const orders = await OrderModel.find({ userId: session.user.id }).sort("-createdAt").limit(1);
    const result = orders.map((order) => {
        return {
            id: order._id.toString(),
            paymentStatus: order.paymentStatus,
            date: order.createdAt.toString(),
            total: order.totalAmount,
            deliveryStatus: order.deliveryStatus,
            products: order.orderItems,
        };
    });

    return JSON.stringify(result);
};
const UpdateUserInfo = async () => {
    const profile = await fetchUserProfile();
    const orders = JSON.parse(await fetchOrderInfo());
    return (
        <div>
            <EmailVerificationRequest id={profile.id} verified={profile.verified} />
            <div className="flex flex-col md:flex-row py-4 space-y-4">
                <div className="p-4 space-y-4">
                    <ProfileForm
                        id={profile.id}
                        email={profile.email}
                        name={profile.name}
                        avatar={profile.avatar}
                    />
                </div>

                <div className="p-4 md:flex-1">
                    <div className="flex items-center justify-between">
                        <h1 className="text-base md:text-xl 2xl:text-2xl font-semibold uppercase opacity-70 ">
                            last order
                        </h1>
                        <Link
                            href="/profile/orders"
                            className="uppercase hover:underline bg-orange-400 text-white px-2 md:px-4 py-1 rounded text-sm md:text-base"
                        >
                            See all orders
                        </Link>
                    </div>
                    <RecentOrderedItems orders={orders} />
                </div>
            </div>
        </div>
    );
};

export default UpdateUserInfo;
