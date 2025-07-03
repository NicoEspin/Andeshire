"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";
import { fetchCandidateAnalyses } from "@/state/api/Candidates/id/FetchCandidateAnalysis";

// ... helpers getColorByScore, getProgressColorByScore, etc.

const CandidatesMatching = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { analyses, loading, loaded, error } = useSelector(
    (state: RootState) => state.candidateAnalysis
  );
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!loaded) {
      fetchCandidateAnalyses(dispatch);
    }
  }, [dispatch, loaded]);

  // Helper para determinar color
  function getColorByScore(score: number) {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  }

  // Helper para Progress color
  function getProgressColorByScore(score: number) {
    if (score >= 75) return "[&>div]:bg-green-500";
    if (score >= 50) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-red-500";
  }

  // Helper para chip color
  function getChipColorByScore(score: number) {
    if (score >= 75) return "bg-green-500 text-white";
    if (score >= 50) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  }

  // Helper para heimdall chip
  function getColorByHeimdall(value: string) {
    const v = value.toUpperCase();

    if (v === "APLICA FUERTEMENTE") return "bg-green-500 text-white";
    if (v === "APLICA") return "bg-yellow-500 text-white";
    if (v === "NO APLICA") return "bg-red-500 text-white";
    if (v === "NO APLICA FUERTEMENTE") return "bg-red-700 text-white";

    return "bg-gray-500 text-white"; // fallback
  }
  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return <p className="text-gray-600">Cargando análisis...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (analyses.length === 0) {
    return <p className="text-gray-600">No hay análisis disponibles.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="border-b pb-4 w-full">
          <h1 className="text-2xl font-semibold ">Análisis de Heimdall</h1>
          <p className="text-gray-600">Evaluación inteligente de candidatos</p>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {analyses.map((analysis) => {
          const isExpanded = expanded[analysis.id] || false;

          const hasGrades =
            analysis.skills_grade > 0 ||
            analysis.match_grade > 0 ||
            analysis.adaptability_grade > 0;

          const averageGrade = hasGrades
            ? Math.round(
                (analysis.skills_grade +
                  analysis.match_grade +
                  analysis.adaptability_grade) /
                  3
              )
            : null;

          return (
            <Card
              key={analysis.id}
              className="relative shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row justify-between items-start pb-4">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-semibold text-gray-800 leading-tight">
                    {analysis.job_title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(analysis.created_at).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold shadow-md",
                    averageGrade !== null
                      ? getChipColorByScore(averageGrade)
                      : getColorByHeimdall(analysis.heimdall || "NO APLICA")
                  )}
                >
                  {averageGrade !== null
                    ? `${averageGrade}%`
                    : analysis.heimdall}
                </div>
              </CardHeader>

              {hasGrades && (
                <CardContent className="space-y-4 pt-0">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Habilidades
                        </span>
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            getColorByScore(analysis.skills_grade)
                          )}
                        >
                          {analysis.skills_grade}%
                        </span>
                      </div>
                      <Progress
                        value={analysis.skills_grade}
                        className={cn(
                          "h-2 bg-gray-200",
                          getProgressColorByScore(analysis.skills_grade)
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Coincidencia
                        </span>
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            getColorByScore(analysis.match_grade)
                          )}
                        >
                          {analysis.match_grade}%
                        </span>
                      </div>
                      <Progress
                        value={analysis.match_grade}
                        className={cn(
                          "h-2 bg-gray-200",
                          getProgressColorByScore(analysis.match_grade)
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Adaptabilidad
                        </span>
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            getColorByScore(analysis.adaptability_grade)
                          )}
                        >
                          {analysis.adaptability_grade}%
                        </span>
                      </div>
                      <Progress
                        value={analysis.adaptability_grade}
                        className={cn(
                          "h-2 bg-gray-200",
                          getProgressColorByScore(analysis.adaptability_grade)
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              )}

              <CardContent className="pt-0">
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                  onClick={() => toggleExpanded(analysis.id)}
                >
                  {isExpanded ? "Ocultar puntos clave" : "Ver puntos clave"}
                </Button>

                {isExpanded && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div
                      className="text-sm text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: analysis.key_points }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CandidatesMatching;
