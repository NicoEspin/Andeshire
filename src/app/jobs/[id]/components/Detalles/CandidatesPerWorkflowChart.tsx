"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Stage } from "../../types/StagesTypes";

// Props tipados
interface Props {
  stages: Stage[];
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28CF6", "#F67280", "#6C5B7B", "#355C7D",
  "#F8B195", "#C06C84", "#355C7D", "#FF6F61",
  "#3EC1D3", "#FF9A8B", "#FFC3A0", "#FFDD94"
];

const CandidatesPerWorkflowChart = ({ stages }: Props) => {
  // Filtra stages con candidatos > 0
  const data = stages
    .filter(stage => stage.candidates_count > 0)
    .map(stage => ({
      name: stage.name,
      value: stage.candidates_count,
    }));

  const totalCandidates = data.reduce((acc, cur) => acc + cur.value, 0);

  // Legend personalizado
  const renderLegend = () => {
    return (
      <ul className="mt-4 space-y-2">
        {data.map((entry, index) => {
          const percentage = ((entry.value / totalCandidates) * 100).toFixed(1);
          return (
            <li key={`item-${index}`} className="flex items-center space-x-2 text-sm">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="flex-1">{entry.name}</span>
              <span className="font-medium">{entry.value} ({percentage}%)</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Card className="w-full  mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Dashboard de la vacante</CardTitle>
        <CardDescription>Progreso de candidatos en el workflow</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {data.length === 0 ? (
          <div className="text-gray-500">No hay datos de candidatos para mostrar.</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {renderLegend()}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidatesPerWorkflowChart;
