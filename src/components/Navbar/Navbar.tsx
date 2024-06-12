import { auth } from "@/auth";
import NavUI from "./NavUI";
import CartModel from "@models/cartModel";
import { Types } from "mongoose";
import startDb from "@lib/db";
import UserModel from "@models/userModel";

const fetchUserProfile = async () => {
    const session = await auth();
    if (!session) return null;

    await startDb();
    const user = await UserModel.findById(session.user.id);
    if (!user) return null;
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar?.url,
        verified: user.verified,
    };
};

const getCartItemsCount = async () => {
    try {
        await startDb();
        const session = await auth();
        if (!session?.user) return 0;
        const userId = session.user.id;
        const cart = await CartModel.aggregate([
            { $match: { userId: new Types.ObjectId(userId) } },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$_id",
                    totalQuantity: { $sum: "$items.quantity" },
                },
            },
        ]);

        if (cart.length) {
            return cart[0].totalQuantity;
        } else {
            return 0;
        }
    } catch (error) {
        console.log("Error while fetching cart items count: ", error);
        return 0;
    }
};

const Navbar = async () => {
    const cartItemsCount = await getCartItemsCount();
    const profile = await fetchUserProfile();
    return (
        <div className="shadow-md">
            <NavUI cartItemsCount={cartItemsCount} avatar={profile?.avatar} />
        </div>
    );
};

export default Navbar;
