"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

const data = [
  {
    analyses: [
      {
        id: "a1ed099b-4ab7-446f-9065-c00846374561",
        job_id: "4090ca02-f538-4425-b1e1-5cc673f96e1d",
        job_title:
          "Líder Emprendedor en Reclutamiento y Selección de Talento IT",
        recruiter_id: null,
        recruiter_name: null,
        skills_grade: 60,
        match_grade: 65,
        adaptability_grade: 70,
        key_points:
          "\u003Cul\u003E\n\u003Cli\u003ETecnología: El candidato tiene experiencia en sourcing, reclutamiento y herramientas como LinkedIn Recruiter, Excel y Office, que son relevantes para el rol. Sin embargo, no se menciona experiencia con ChatGPT, Notion, CRM u otras herramientas específicas de automatización y gestión de talento mencionadas en la oferta.\u003C/li\u003E\n\u003Cli\u003EAdaptabilidad: Tiene experiencia en reclutamiento IT y en diferentes industrias, mostrando capacidad de adaptación y aprendizaje en diferentes contextos.\u003C/li\u003E\n\u003Cli\u003EExperiencia y conocimientos: Cuenta con más de 4 años en reclutamiento y sourcing, incluyendo roles en IT, lo que indica una base sólida para liderar una unidad de selección y aplicar innovación en el proceso.\nEl perfil muestra buena compatibilidad en habilidades y experiencia, aunque le falta experiencia específica en algunas tecnologías y herramientas de automatización y gestión moderna de talento.\u003C/li\u003E\n\u003C/ul\u003E",
        created_at: "2025-04-24T18:32:46.699535+00:00",
        updated_at: "2025-04-24T18:32:46.699557+00:00",
      },
      {
        id: "9a31722a-b8e1-437b-93fd-1570176f67df",
        job_id: "47330953-2666-4fbe-9ff7-7246137a7b64",
        job_title: "NET Core, WCF, WPF, REST APIs, Azure",
        recruiter_id: null,
        recruiter_name: null,
        skills_grade: 30,
        match_grade: 40,
        adaptability_grade: 50,
        key_points:
          "\u003Cul\u003E\n\u003Cli\u003E✅ El candidato tiene experiencia en Sourcing, Reclutamiento, Excel, Office y HR, pero no en tecnologías específicas de desarrollo como .NET Core, WCF, WPF, REST APIs, Docker, Kubernetes, ni en seguridad informática.\u003C/li\u003E\n\u003Cli\u003E❌ No se evidencia experiencia en mantenimiento de productos tecnológicos, migraciones tecnológicas, ni en trabajo con sistemas legacy o control de acceso.\u003C/li\u003E\n\u003Cli\u003E❌ La experiencia en IT del candidato (1 año y 11 meses) no cubre los requisitos técnicos específicos del rol, especialmente en desarrollo y seguridad.\u003C/li\u003E\n\u003Cli\u003E✅ La experiencia en HR y reclutamiento puede indicar habilidades de colaboración y comunicación, pero no son relevantes para los requisitos técnicos del puesto.\u003C/li\u003E\n\u003Cli\u003E❌ La falta de experiencia en seguridad, APIs, y tecnologías de desarrollo y contenedores, hace que el candidato no sea adecuado para este rol técnico especializado.\u003C/li\u003E\n\u003C/ul\u003E",
        created_at: "2025-04-20T21:54:24.200615+00:00",
        updated_at: "2025-04-20T21:54:24.200639+00:00",
      },
      {
        id: "b917a427-51d6-4bc3-848b-b4ad6f43f758",
        job_id: "2b627fad-8b7c-4afe-9ac1-2e6777e3e2e5",
        job_title: "Workday Tester Lead",
        recruiter_id: null,
        recruiter_name: null,
        skills_grade: 0,
        match_grade: 0,
        adaptability_grade: 0,
        key_points:
          "\u003Cul\u003E\n\u003Cli\u003E❌ El candidato no tiene experiencia en Workday, solo 2 años y 5 meses en reclutamiento y sourcing, lo cual no cumple con el requisito de 5-6 años de experiencia en Workday.\u003C/li\u003E\n\u003Cli\u003E❌ No se menciona experiencia en desarrollo de un marco de pruebas, lo cual es un requisito clave del trabajo.\u003C/li\u003E\n\u003Cli\u003E❌ No hay evidencia de experiencia en metodologías ágiles ni en herramientas como JIRA o Azure DevOps.\u003C/li\u003E\n\u003Cli\u003E❌ El candidato no tiene experiencia en la ejecución o creación de casos de prueba, lo cual es necesario para el puesto.\u003C/li\u003E\n\u003Cli\u003E❌ No se menciona ninguna formación o certificación relacionada con Workday, lo cual sería un gran plus.\u003C/li\u003E\n\u003C/ul\u003E",
        created_at: "2025-04-14T18:15:26.546566+00:00",
        updated_at: "2025-04-14T18:15:26.546588+00:00",
        heimdall: "APLICA FUERTEMENTE",
      },
      {
        id: "0b1ef4d3-e717-4d24-99e6-79c2885b1341",
        job_id: "f987a7f0-8732-4da1-a845-ccec35116f8a",
        job_title: "Browser Extension Engineer w/ JavaScript, HTML, and CSS",
        recruiter_id: null,
        recruiter_name: null,
        skills_grade: 0,
        match_grade: 0,
        adaptability_grade: 0,
        key_points:
          "\u003Cul\u003E\n\u003Cli\u003E❌ El candidato no tiene experiencia en desarrollo de extensiones de navegador, ni en plataformas específicas como Chrome, Edge, Firefox o Safari.\u003C/li\u003E\n\u003Cli\u003E❌ No se menciona conocimiento en JavaScript, HTML, CSS, APIs de extensiones de navegador ni en principios de seguridad web.\u003C/li\u003E\n\u003Cli\u003E❌ No hay experiencia en control de versiones, CI/CD ni en integración con infraestructura de seguridad.\u003C/li\u003E\n\u003Cli\u003E❌ La experiencia en sourcing, reclutamiento y administración de recursos humanos no es relevante para el rol de ingeniero de software en ciberseguridad.\u003C/li\u003E\n\u003Cli\u003E❌ La experiencia del candidato en IT y HR no cumple con los requisitos técnicos específicos del puesto.\u003C/li\u003E\n\u003C/ul\u003E",
        created_at: "2025-04-23T14:02:43.616076+00:00",
        updated_at: "2025-04-23T14:02:43.616099+00:00",
        heimdall: "APLICA",
      },
      {
        id: "121daf7d-c9be-4e26-8bc4-cf05dfe0ed26",
        job_id: "f96c5cba-1f97-4c66-b486-9e34e0a3a385",
        job_title: "Django Developer",
        recruiter_id: null,
        recruiter_name: null,
        skills_grade: 0,
        match_grade: 0,
        adaptability_grade: 0,
        key_points:
          "\u003Cp\u003EEl candidato tiene experiencia en reclutamiento de tecnología, pero no posee experiencia directa como desarrollador Django ni conocimientos en Python, que son requisitos clave para el puesto de Django Developer. Además, no se cumplen los años mínimos de experiencia solicitados en la JD.\u003C/p\u003E",
        heimdall: "NO APLICA FUERTEMENTE",
        created_at: "2025-05-30T19:15:28.949999+00:00",
        updated_at: "2025-05-30T19:15:28.950020+00:00",
      },
    ],
  },
];

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

const CandidatesMatching = (props: Props) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="border-b pb-4 w-full">
          <h1 className="text-2xl font-semibold ">Análisis de Heimdall</h1>
          <p className="text-gray-600">Evaluación inteligente de candidatos</p>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="space-y-4">
        {data[0].analyses.map((analysis) => {
          const isExpanded = expanded[analysis.id] || false;

          // Calcular promedio si hay grades
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
                {/* Chip */}
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
