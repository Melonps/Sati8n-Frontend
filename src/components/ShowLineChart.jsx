import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = [
    "#ed8a47",
    "#fbd688",
    "#f44646",
    "#aa598a",
    "#d0a897",
    "#f4d6cb",
    "#9DD9D2",
];

const AreaGraph = ({ data }) => {
    // グラデーションのIDを生成
    const gradientId = "caloryGradient";

    return (
        <ResponsiveContainer minWidth={150} width="80%" height={200}>
            <AreaChart data={data}>
                <defs>
                    {/* 線形グラデーションを定義 */}
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor={COLORS[0]}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor={COLORS[0]}
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="time"
                    padding={{ left: 30, right: 30 }}
                    tick={{ fill: "#4E5049" }}
                />
                <YAxis tick={{ fill: "#4E5049" }} />
                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="calory"
                    stroke={COLORS[0]}
                    fill={`url(#${gradientId})`} // グラデーションを適用
                    activeDot={{ r: 8 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaGraph;
