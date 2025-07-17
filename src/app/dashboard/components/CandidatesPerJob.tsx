"use client";

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

interface JobData {
  id: string;
  title: string;
  company_name: string;
  candidate_count: number;
}

interface CandidatesPerJobProps {
  data: JobData[];
}

const COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444",
  "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"
];

export default function CandidatesPerJob({ data }: CandidatesPerJobProps) {
  const sortedData = [...data].sort((a, b) => b.candidate_count - a.candidate_count);

  return (
    <ResponsiveContainer width="100%"  className="overflow-hidden">
      <BarChart
        data={sortedData}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <XAxis type="number" />
        <YAxis 
          type="category" 
          dataKey="title" 
          width={200}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => `${value} candidatos`}
          labelFormatter={(label: string) => `Trabajo: ${label}`}
          contentStyle={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px'
          }}
        />
        <Bar dataKey="candidate_count" radius={[0, 8, 8, 0]}>
          {sortedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}