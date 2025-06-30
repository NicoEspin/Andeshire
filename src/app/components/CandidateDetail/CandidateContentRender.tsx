"use client";

import { useState } from "react";
import CandidateNav from "./CandidateNav";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import CandidateCv from "./Resumen/CandidateCv";
import CandidateExperience from "./Resumen/CandidateExperience";
import CandidateJobsTable from "./Trabajos/CandidateJobsTable";

interface CandidateHeaderProps {
  candidate: CandidateDetail;
}
export default function CandidateContentRender({
  candidate,
}: CandidateHeaderProps) {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div>
      <CandidateNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-4">
        {activeTab === "summary" && (
          <div className="flex flex-col gap-6">
            <CandidateCv candidate={candidate} />
            <CandidateExperience candidate={candidate} />
          </div>
        )}
        {activeTab === "jobs" && <CandidateJobsTable candidate={candidate} />}
        {activeTab === "matching" && <div>Contenido de Matching</div>}
        {activeTab === "forms" && <div>Contenido de Formularios</div>}
        {activeTab === "comments" && <div>Contenido de Comentarios</div>}
        {activeTab === "meetings" && <div>Contenido de Reuniones</div>}
      </div>
    </div>
  );
}
