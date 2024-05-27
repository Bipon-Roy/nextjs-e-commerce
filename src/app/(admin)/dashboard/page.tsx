import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import SalesReport from "@/components/SalesReport";
import { formatPrice } from "@/utils/helper";
import dateFormat from "dateformat";

//last 7 days sales history
const salesHistory = async () => {
    //calculating the data e.g.last 7days
    const lastSevenDays = new Date();
    lastSevenDays.setDate(lastSevenDays.getDate() - 7);

    const dateList: string[] = [];

    // getting the last 7 days formatted date value
    for (let i = 0; i < 7; i++) {
        const date = new Date(lastSevenDays);
        date.setDate(date.getDate() + i);
        dateList.push(date.toISOString().split("T")[0]);
    }

    //fetch sales data for last 7 days
    await startDb();
    const result: {
        _id: string;
        totalAmount: number;
    }[] = await OrderModel.aggregate([
        {
            $match: {
                createdAt: { $gte: lastSevenDays },
                paymentStatus: "paid",
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalAmount: { $sum: "$totalAmount" },
            },
        },
    ]);

    //creating sales based on date for chart
    const sales = dateList.map((date) => {
        const matchedSale = result.find((sale) => sale._id === date);
        return {
            day: dateFormat(date, "ddd"),
            sale: matchedSale ? matchedSale.totalAmount : 0,
        };
    });

    //calculating total sales amount for last 7 days
    const totalSaleAmount = result.reduce((prevValue, { totalAmount }) => {
        return (prevValue += totalAmount);
    }, 0);

    return { sales, totalSaleAmount };
};

const Sales = async () => {
    const salesData = await salesHistory();

    return (
        <div>
            <div className="mt-5">
                <h1 className="font-semibold bg-blue-500/10 text-blue-500 text-3xl text-center mb-3 py-1 rounded">
                    Last week sales report
                </h1>
                <p className="md:text-xl font-semibold my-2">
                    Total Sales : {formatPrice(salesData.totalSaleAmount)}
                </p>
                <SalesReport data={salesData.sales} />
            </div>
        </div>
    );
};

export default Sales;
