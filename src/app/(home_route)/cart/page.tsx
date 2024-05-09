import startDb from "@lib/db";
import cartModel from "@models/CartModel";
import { auth } from "@/auth";
import CartItems from "@/components/CartItems";
import { Types } from "mongoose";
const fetchCartProducts = async () => {
    const session = await auth();
    if (!session?.user) return null;
    await startDb();
    const [cartItems] = await cartModel.aggregate([
        { $match: { userId: new Types.ObjectId(session.user.id) } },
        { $unwind: "$items" },
        {
            $lookup: {
                from: "products",
                foreignField: "_id",
                localField: "items.productId",
                as: "product",
            },
        },
        {
            $project: {
                _id: 0,
                id: { $toString: "$_id" },
                totalQuantity: { $sum: "$items.quantity" },
                products: {
                    id: { $toString: { $arrayElemAt: ["$product._id", 0] } },
                    thumbnail: { $arrayElemAt: ["$product.thumbnail.url", 0] },
                    title: { $arrayElemAt: ["$product.title", 0] },
                    price: { $arrayElemAt: ["$product.price.discounted", 0] },
                    qty: "$items.quantity",
                    totalPrice: {
                        $multiply: [
                            "$items.quantity",
                            { $arrayElemAt: ["$product.price.discounted", 0] },
                        ],
                    },
                },
            },
        },
        {
            $group: {
                _id: null,
                id: { $first: "$id" },
                totalQty: { $sum: "$totalQuantity" },
                totalPrice: { $sum: "$products.totalPrice" },
                products: { $push: "$products" },
            },
        },
        {
            $project: {
                _id: 0,
                id: 1,
                totalQty: 1,
                totalPrice: 1,
                products: 1,
            },
        },
    ]);
    return cartItems;
};
const Cart = async () => {
    const cart = await fetchCartProducts();
    if (!cart)
        return (
            <div className="h-[350px] flex justify-center items-center">
                <p className="text-red-500 text-center text-lg md:text-2xl">
                    Currently, no items are in the cart!
                </p>
            </div>
        );
    return (
        <CartItems
            cartId={cart.id}
            products={cart.products}
            cartTotal={cart.totalPrice}
            totalQty={cart.quantity}
        />
    );
};

export default Cart;
