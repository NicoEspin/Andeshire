"use client";

import { useState } from "react";
import CandidateNav from "./CandidateNav";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import CandidateCv from "./Resumen/CandidateCv";
import CandidateExperience from "./Resumen/CandidateExperience";
import CandidateJobsTable from "./Trabajos/CandidateJobsTable";
import CandidateComments from "./Comentarios/CandidateComments";
import CandidateMeetings from "./Reuniones/CandidateMeetings";
import CandidateScoreboard from "./Formularios/CandidateScoreboard";
import CandidatesMatching from "./Matching/CandidatesMatching";
import CandidateCustom from "./Personalizados/CandidateCustom";

interface CandidateContentRenderProps {
  candidate: CandidateDetail;
}
export default function CandidateContentRender({
  candidate,
}: CandidateContentRenderProps) {
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
        {activeTab === "matching" && <CandidatesMatching />}
        {activeTab === "forms" && <CandidateScoreboard />}
        {activeTab === "comments" && <CandidateComments />}
        {activeTab === "meetings" && <CandidateMeetings />}
        {activeTab === "custom" && <CandidateCustom candidate={candidate} />}
      </div>
    </div>
  );
}
