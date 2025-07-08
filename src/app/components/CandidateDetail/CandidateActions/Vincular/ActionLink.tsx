"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { JobListItem } from "@/app/jobs/[id]/types/JobTypes";
import LinkCandidateStage from "./LinkCandidateStage";
import { useTranslations } from "next-intl";

interface CandidateLinkProps {
  jobList: JobListItem[];
  loading: boolean;
  error: string | null;
}

const ActionLink = ({ jobList }: CandidateLinkProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const t = useTranslations("CandidateDetail.CandidateActions.ActionLink");

  const filteredJobs = jobList.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-blue-100 hover:text-blue-700"
        >
          <Link className="w-4 h-4" />
          {t("Button")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Title")}</DialogTitle>
        </DialogHeader>

        <Input
          placeholder={t("SearchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <span className="text-sm font-medium">
                {job.title} - {job.company?.name}
              </span>
              <LinkCandidateStage />
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <p className="text-sm text-gray-500">{t("NoResults")}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionLink;
