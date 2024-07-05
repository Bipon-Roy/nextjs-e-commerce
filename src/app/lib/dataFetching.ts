import CartModel from "@models/cartModel";
import { Types } from "mongoose";
import startDb from "@lib/db";
import UserModel from "@models/userModel";

interface Profile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    verified: boolean;
}

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
    await startDb();
    const user = await UserModel.findById(userId);
    if (!user) return null;

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar?.url,
        verified: user.verified,
    };
};

export const getCartItemsCount = async (userId: string): Promise<number> => {
    try {
        await startDb();
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

        return cart.length ? cart[0].totalQuantity : 0;
    } catch (error) {
        console.error("Error while fetching cart items count: ", error);
        return 0;
    }
};
