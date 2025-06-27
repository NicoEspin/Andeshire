import React, { useState } from "react";
import { Job } from "../../types/JobTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobSummarySection from "./JobSummarySection";
import { Megaphone } from "lucide-react";
import Images from "./Images";

interface DescriptionViewProps {
  job: Job;
}

const tabs = [
  { id: "resumen", label: "Resumen" },
  { id: "aviso", label: "Aviso publicitario" },
  { id: "privado", label: "Descripción privada" },
  {
    id: "imagenes",
    label: (
      <span className="inline-flex items-center space-x-1">
        <span>Imágenes</span>
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-300 px-1.5 py-0.5 text-xs"
        >
          BETA
        </Badge>
      </span>
    ),
  },
];

const DescriptionView = ({ job }: DescriptionViewProps) => {
  const [activeTab, setActiveTab] = useState("resumen");

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <Button
            key={typeof tab.label === "string" ? tab.label : tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant="ghost"
            className={cn(
              "rounded-none border-b-2 transition-all duration-200 px-4 py-2 text-sm font-medium",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-primary"
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-2 text-sm text-gray-700">
          {activeTab === "resumen" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <JobSummarySection
                title="Análisis detallado"
                contentHtml={
                  job.questions || "<p>No hay información disponible.</p>"
                }
              />
              <JobSummarySection
                title="Resumen técnico"
                contentHtml={
                  job.technical_info ||
                  "<p>No hay información técnica cargada.</p>"
                }
              />
            </div>
          )}
          {activeTab === "aviso" && (
            <JobSummarySection
              title={job.public_title || "Aviso publicitario"}
              contentHtml={
                job.public_description
                  ? job.public_description.replace(/\n/g, "<br />")
                  : "<p>No hay aviso cargado.</p>"
              }
            />
          )}

          {activeTab === "privado" && (
           <JobSummarySection
              title={job.title || "Aviso publicitario"}
              contentHtml={
                job.description
                  ? job.description.replace(/\n/g, "<br />")
                  : "<p>No hay aviso cargado.</p>"
              }
            />
          )}
        
          {activeTab === "imagenes" && (
            <Images />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionView;
