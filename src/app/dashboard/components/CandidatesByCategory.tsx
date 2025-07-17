"use client";

import React from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

interface CandidatesByCategoryProps {
  data: {
    category: string;
    count: number;
  }[];
}

export default function CandidatesByCategory({
  data,
}: CandidatesByCategoryProps) {
  // Transformar para formato requerido por Treemap
  const formattedData = data.map((item) => ({
    name: item.category,
    size: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={550} className={"overflow-hidden"} >
      <Treemap
        data={formattedData}
        dataKey="size"
        nameKey="name"
        stroke="#fff"
        fill="#8884d8"
        aspectRatio={1}
        content={<CustomTreemapContent />}
      >
        <Tooltip
          formatter={(value: number) => `${value} candidatos`}
          labelFormatter={(label: string) => `Categoría: ${label}`}
        />
      </Treemap>
    </ResponsiveContainer>
  );
}

// 🎨 Personalización de las celdas del Treemap
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, size, index, colors, rank, ...rest } =
    props;

  const fill = `hsl(${(index * 35) % 360}, 70%, 60%)`;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill,
          stroke: "#fff",
          strokeWidth: 1,
        }}
      />
      {width > 60 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
          fontWeight={600}
        >
          {name}
        </text>
      )}
    </g>
  );
};
