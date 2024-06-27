import startDb from "@lib/db";
import OrderModel from "@models/orderModel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OrderList from "@components/OrderList";

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
