import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import { auth } from "@/auth";
import OrderList from "@/components/OrderList";

import { redirect } from "next/navigation";

const fetchOrdersInfo = async () => {
    const session = await auth();
    if (!session?.user) {
        return null;
    }
    await startDb();
    const ordersInfo = await OrderModel.find({ userId: session.user.id }).sort("-createdAt");
    const data = ordersInfo.map((order) => {
        return {
            id: order._id.toString(),
            paymentStatus: order.paymentStatus,
            date: order.createdAt.toString(),
            total: order.totalAmount,
            deliveryStatus: order.deliveryStatus,
            products: order.orderItems,
        };
    });

    return JSON.stringify(data);
};

const OrdersInfo = async () => {
    const result = await fetchOrdersInfo();
    if (!result) {
        return redirect("/404");
    }
    return (
        <div>
            <OrderList orders={JSON.parse(result)} />
        </div>
    );
};

export default OrdersInfo;
