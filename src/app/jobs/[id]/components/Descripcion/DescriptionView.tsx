"use client";

import React, { useState } from "react";
import { Job } from "../../types/JobTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobSummarySection from "./JobSummarySection";
import Images from "./Images";
import { useTranslations } from "next-intl";

interface DescriptionViewProps {
  job: Job;
}

const DescriptionView = ({ job }: DescriptionViewProps) => {
  const t = useTranslations("JobId.Description");
  const [activeTab, setActiveTab] = useState("resumen");

  const tabs = [
    { id: "resumen", label: t("Tabs.Summary") },
    { id: "aviso", label: t("Tabs.PublicNotice") },
    { id: "privado", label: t("Tabs.PrivateDescription") },
    {
      id: "imagenes",
      label: (
        <span className="inline-flex items-center space-x-1">
          <span>{t("Tabs.Images")}</span>
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300 px-1.5 py-0.5 text-xs"
          >
            {t("Tabs.ImagesBeta")}
          </Badge>
        </span>
      ),
    },
  ];

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
                title={t("Sections.DetailedAnalysis")}
                contentHtml={
                  job.questions || `<p>${t("Placeholders.NoInfo")}</p>`
                }
              />
              <JobSummarySection
                title={t("Sections.TechnicalSummary")}
                contentHtml={
                  job.technical_info ||
                  `<p>${t("Placeholders.NoTechnicalInfo")}</p>`
                }
              />
            </div>
          )}

          {activeTab === "aviso" && (
            <JobSummarySection
              title={job.public_title || t("Tabs.PublicNotice")}
              contentHtml={
                job.public_description
                  ? job.public_description.replace(/\n/g, "<br />")
                  : `<p>${t("Placeholders.NoNotice")}</p>`
              }
            />
          )}

          {activeTab === "privado" && (
            <JobSummarySection
              title={job.title || t("Tabs.PrivateDescription")}
              contentHtml={
                job.description
                  ? job.description.replace(/\n/g, "<br />")
                  : `<p>${t("Placeholders.NoNotice")}</p>`
              }
            />
          )}

          {activeTab === "imagenes" && <Images />}
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionView;
