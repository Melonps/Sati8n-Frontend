import React from "react";
import { Box, Typography } from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#9BA3B5", "#df929b"]; // Blue for goal, Green for current intake

const MealSum = ({ goalCalories, data }) => {
    console.log(data);
    const currentCalories = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.calory,
        0 // 初期値を指定
    );
    const calory_data = [
        { name: "目標カロリー", value: goalCalories },
        { name: "現在摂取カロリー", value: currentCalories },
    ];

    return (
        <ResponsiveContainer minWidth={50} width="100%" height={300}>
            <PieChart>
                <Pie
                    data={calory_data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={80}
                    animationBegin={200}
                    animationDuration={1000}
                    fill="#4E5049"
                    startAngle={-270} // Set start angle to 90 degrees (12 o'clock position)
                >
                    {calory_data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Legend verticalAlign="bottom" height={36} />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    verticalAnchor="start"
                    fontSize="40"
                    fill="#4E5049"
                >
                    {`${currentCalories}`}
                </text>
                <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    verticalAnchor="end"
                    fontSize="24"
                    fill="#4E5049"
                >
                    {`kcal`}
                </text>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default MealSum;
