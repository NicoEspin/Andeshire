"use client";

import { useTranslations } from "next-intl";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Button } from "@/components/ui/button";
import { Plus, FileText, FolderOpen } from "lucide-react";
import { useState } from "react";
import AddCandidateFiles from "./AddCandidateFiles";

type CandidateFilesProps = {
  candidate: CandidateDetail;
};

export default function CandidateFiles({ candidate }: CandidateFilesProps) {
  const t = useTranslations("CandidateDetail.Summary.Files");
  const { files } = candidate;
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-2xl p-6 space-y-6 shadow-sm bg-white h-fit">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{t("title")}</h2>
        <Button
          variant="default"
          className="bg-purple-700 hover:bg-purple-800 text-white"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("add")}
        </Button>
      </div>

      {files && files.length > 0 ? (
        <ul className="space-y-4">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between border p-4 rounded-xl hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-700" />
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-700 font-medium hover:underline"
                >
                  {file.filename}
                </a>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(file.uploaded_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
          <FolderOpen className="w-12 h-12 mb-4 text-purple-700" />
          <p className="text-sm italic">{t("empty")}</p>
        </div>
      )}

      <AddCandidateFiles open={open} onOpenChange={setOpen} />
    </div>
  );
}
