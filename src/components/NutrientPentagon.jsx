import React from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

const NutrientPentagon = ({ nutrients }) => {
    const data = [
        { nutrient: "Protein", value: nutrients.Protein },
        { nutrient: "Carbohydrates", value: nutrients.Carbohydrates },
        { nutrient: "Fat", value: nutrients.Fat },
        { nutrient: "Vitamins", value: nutrients.Vitamins },
        { nutrient: "Minerals", value: nutrients.Minerals },
    ];

    return (
        <ResponsiveContainer minWeight={50} width="100%" height={300}>
            <RadarChart outerRadius={80} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="nutrient" />

                <Radar
                    name="Nutrient"
                    dataKey="value"
                    fill="#df929b"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default NutrientPentagon;
