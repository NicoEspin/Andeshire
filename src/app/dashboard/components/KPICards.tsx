"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import React from "react";

interface KPICardsProps {
  metrics: {
    total_companies: number;
    total_jobs: number;
    total_candidates: number;
    total_recruiters: number;
    trends: {
      companies_trend: number;
      jobs_trend: number;
      candidates_trend: number;
      recruiters_trend: number;
    };
  };
}

const kpiMeta = {
  total_companies: { label: "Empresas", trendKey: "companies_trend" },
  total_jobs: { label: "Trabajos", trendKey: "jobs_trend" },
  total_candidates: { label: "Candidatos", trendKey: "candidates_trend" },
  total_recruiters: { label: "Recruiters", trendKey: "recruiters_trend" },
};

const KPICards = ({ metrics }: KPICardsProps) => {
  return (
    <>
      {Object.entries(kpiMeta).map(([key, meta]) => {
        const total = metrics[key as keyof typeof metrics] as number;
        const trend =
          metrics.trends[meta.trendKey as keyof typeof metrics.trends];

        const isPositive = trend >= 0;

        const TrendIcon = isPositive ? ArrowUp : ArrowDown;

        return (
          <Card
            key={key}
            className=" shadow-sm rounded-2xl transition hover:shadow-md"
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                {meta.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-semibold tracking-tight">
                {total}
              </div>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 px-2 py-1 text-sm border-none ${
                  isPositive
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                <TrendIcon className="w-4 h-4" />
                {Math.abs(trend).toFixed(1)}%
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default KPICards;
