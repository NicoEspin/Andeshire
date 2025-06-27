"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { fetchJobById } from "@/state/api/fetchJob";
import JobHeader from "./components/JobHeader";
import JobNav from "./components/JobNav";
import JobContentRenderer from "./components/JobContentRenderer";

export default function JobPage() {
  const dispatch = useAppDispatch();
  const { job, stages, candidatesByStage, loading, error } = useAppSelector(
    (state) => state.job
  );
  const [activeTab, setActiveTab] = useState("detalles");
  useEffect(() => {
    // 🔒 ID fijo temporalmente
    fetchJobById("06e26558-770d-4c74-a392-d5042218007f", dispatch);
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading job data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!job) {
    return <div className="p-6 text-gray-500">No job found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <JobHeader job={job} />
      <JobNav activeTab={activeTab} onTabChange={setActiveTab} />
      <JobContentRenderer
        job={job}
        stages={stages} 
        candidatesByStage={candidatesByStage}
        activeTab={activeTab}
      />
    </div>
  );
}
