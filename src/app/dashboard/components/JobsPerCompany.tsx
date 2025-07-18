"use client";

import { useTranslations } from "next-intl";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

type JobPerCompany = {
  id: string;
  name: string;
  job_count: number;
};

type JobsPerCompanyProps = {
  data: JobPerCompany[];
};

const COLORS = [
  "#6366f1", // indigo-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#3b82f6", // blue-500
  "#ec4899", // pink-500
  "#8b5cf6", // violet-500
  "#ef4444", // red-500
  "#14b8a6", // teal-500
];

export default function JobsPerCompany({ data }: JobsPerCompanyProps) {
  const t = useTranslations("Dashboard.Charts");
  return (
    <ResponsiveContainer width="100%" height={300} className={"overflow-hidden"}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-30}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value} ${t("Jobs")}`} />
        <Bar dataKey="job_count" name={t("jobCount")}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.id}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
