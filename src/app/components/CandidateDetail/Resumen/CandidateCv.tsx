"use client";

import React from "react";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

type Props = {
  candidate: CandidateDetail;
};

const parseTechnicalResume = (technicalResume: string) => {
  try {
    const jsonString = technicalResume
      .replace(/```json<br>/g, "")
      .replace(/```/g, "")
      .replace(/<br>/g, "")
      .trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing technical_resume", error);
    return {};
  }
};

const cleanCvUrl = (url: string) => {
  const match = url.match(/^[^?]+/);
  return match ? match[0] : url;
};

const CandidateCv = ({ candidate }: Props) => {
  const t = useTranslations("CandidateDetail.Summary.Cv");

  const skills = parseTechnicalResume(candidate.technical_resume);
  const cleanedCvUrl = cleanCvUrl(candidate.cv_url);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* CV PDF */}
      <div className="border rounded-xl overflow-auto shadow-lg">
        <iframe
          src={cleanedCvUrl}
          className="w-full h-[55vh]"
          title={t("CvTitle")}
        />
      </div>

      {/* Technical Summary */}
      <Card className="h-fit shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-700">
            {t("TechnicalResumeTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(skills).map(([skill, duration]: [string, any]) => {
            const totalMonths = duration.years * 12 + duration.months;
            const percentage = Math.min((totalMonths / 48) * 100, 100);

            return (
              <div key={skill}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-gray-800">{skill}</span>
                  <span className="text-sm text-gray-500">
                    {t("SkillYearsMonths", {
                      years: duration.years,
                      months: duration.months,
                    })}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: "#7e22ce",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateCv;
