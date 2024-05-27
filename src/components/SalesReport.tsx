"use client";

import React from "react";
import { Chart } from "react-google-charts";

interface Props {
    data: {
        day: string;
        sale: number;
    }[];
}

const SalesReport = ({ data }: Props) => {
    const chartData = [["Day", "Sales"], ...data.map((item) => [item.day, item.sale])];

    const options = {
        title: "Sales Report",
        curveType: "function",
        legend: { position: "bottom" },
        vAxis: { title: "Sales", format: "currency" },
        tooltip: {
            isHtml: true,
            trigger: "focus",
            ignoreBounds: true,
            textStyle: { fontSize: 12 },
        },
    };

    return (
        <Chart
            chartType="LineChart"
            width="100%"
            height="450px"
            data={chartData}
            options={options}
        />
    );
};

export default SalesReport;
