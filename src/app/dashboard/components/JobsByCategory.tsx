"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type JobCategory = {
  category: string;
  count: number;
};

type JobsByCategoryProps = {
  data: JobCategory[];
};

const COLORS = [
  "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#A855F7"
];

export default function JobsByCategory({ data }: JobsByCategoryProps) {
  return (
    <div className=" w-full h-[300px] overflow-hidden">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ category }) => category}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} trabajos`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
