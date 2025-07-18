"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type CategoryTimelineData = Record<
  string,
  { month: string; count: number }[]
>;

type CategoriesOverTimeProps = {
  data: CategoryTimelineData;
};

const COLOR_PALETTE = [
  "#6366F1", // indigo-500
  "#F59E0B", // amber-500
  "#10B981", // emerald-500
  "#EF4444", // red-500
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#14B8A6", // teal-500
  "#F97316", // orange-500
  "#22D3EE", // cyan-400
  "#A855F7", // purple-500
  "#4ADE80", // green-400
];

export default function CategoriesOverTime({ data }: CategoriesOverTimeProps) {
  const chartData = useMemo(() => {
    const monthMap: Record<string, Record<string, number>> = {};

    for (const [category, entries] of Object.entries(data)) {
      entries.forEach(({ month, count }) => {
        const monthKey = new Date(month).toISOString().slice(0, 7);
        if (!monthMap[monthKey]) monthMap[monthKey] = {};
        monthMap[monthKey][category] = count;
      });
    }

    return Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, counts]) => ({ month, ...counts }));
  }, [data]);

  const allCategories = useMemo(
    () => Object.keys(data).filter((cat) => data[cat].length > 0),
    [data]
  );

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    allCategories.forEach((category, index) => {
      map[category] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    });
    return map;
  }, [allCategories]);

  return (
    <ResponsiveContainer width="100%" className="overflow-hidden">
      <LineChart data={chartData} margin={{ top: 20, right: 30, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          wrapperStyle={{ zIndex: 10 }}
          contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
        />
        <Legend />
        {allCategories.map((category) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colorMap[category]}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
