import OrderModel from "@/app/models/orderModel";
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

    const totalSaleAmount = result.reduce((prevValue, { totalAmount }) => {
        return (prevValue += totalAmount);
    }, 0);

    return { sales, totalSaleAmount };
};

const Sales = async () => {
    const salesData = await salesHistory();
    console.log(salesData);

    return <div>Sales</div>;
};

export default Sales;
