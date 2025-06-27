// components/JobSummarySection.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface JobSummarySectionProps {
  title: string;
  contentHtml: string;
}

const JobSummarySection = ({ title, contentHtml }: JobSummarySectionProps) => {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div
          className="prose prose-sm max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </CardContent>
    </Card>
  );
};

export default JobSummarySection;
