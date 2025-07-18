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
  Cell,
} from "recharts";

interface StageData {
  name: string;
  candidate_count: number;
}

interface CandidatesPerStageProps {
  data: StageData[];
}

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export default function CandidatesPerStage({ data }: CandidatesPerStageProps) {
  const sortedData = [...data].sort(
    (a, b) => b.candidate_count - a.candidate_count
  );
  const t = useTranslations("Dashboard.Charts");

  return (
    <ResponsiveContainer width="100%" className="overflow-hidden">
      <BarChart
        data={sortedData}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={180} />
        <Tooltip
          formatter={(value: number) => `${value} ${t("Candidates")}`}
          labelFormatter={(label: string) => `Etapa: ${label}`}
        />
        <Bar
          dataKey="candidate_count"
          name={t("candidateCount")}
          radius={[0, 8, 8, 0]}
        >
          {sortedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
