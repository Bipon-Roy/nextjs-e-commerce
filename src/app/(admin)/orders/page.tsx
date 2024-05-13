import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import OrderedItemsCard, { Order } from "@/components/OrderedItemsCard";

import { ObjectId } from "mongoose";

const fetchOrdersInfo = async () => {
    await startDb();
    const orders = await OrderModel.find()
        .sort("-createdAt")
        .limit(5)
        .populate<{
            userId: { _id: ObjectId; name: string; email: string; avatar?: { url: string } };
        }>({
            path: "userId",
            select: "name email",
        });

    const result = orders.map((order) => {
        return {
            id: order._id.toString(),
            deliveryStatus: order.deliveryStatus,
            subTotal: order.totalAmount,
            customer: {
                id: order.userId._id.toString(),
                name: order.userId.name,
                email: order.userId.email,
                address: order.shippingDetails.address,
                avatar: order.userId.avatar?.url,
            },
            products: order.orderItems,
        };
    });
    return JSON.stringify(result);
};

const OrdersInfo = async () => {
    const result = await fetchOrdersInfo();
    const orders = JSON.parse(result) as Order[];

    return (
        <div className="py-4 space-y-4">
            {orders.map((order) => {
                return <OrderedItemsCard order={order} key={order.id} disableUpdate={false} />;
            })}
        </div>
    );
};
export default OrdersInfo;
