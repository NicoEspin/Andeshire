"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { fetchJobById } from "@/state/api/fetchJob";
import { ATSJobView } from "./components/ats-job-view";
import { mockJobPipeline } from "./data/mock-ats-data"; // conservar si pipeline sigue siendo mock
import { useParams } from "next/navigation";
import { JobPipeline } from "./types/ats";
import type { Job } from "@/store/slices/JobSlice";


interface ATSJobViewProps {
  job: Job | null;
  pipeline: JobPipeline;
  isLoading: boolean;
  error?: string;
}
export default function ATSJobPage({ jobId = "b1a947d7-ec97-4380-b1de-0416f0f5c3e4" }) {
  const dispatch = useAppDispatch();
  const { job, loading, error } = useAppSelector((state) => state.job);
  const [pipeline, setPipeline] = useState<JobPipeline>(mockJobPipeline);

  useEffect(() => {
    fetchJobById(jobId, dispatch);
  }, [jobId, dispatch]);

  if (loading || !job) {
    return <div className="p-4 text-gray-500">Cargando información del trabajo...</div>;
  }

  return (
    <ATSJobView
      job={Response}
      pipeline={pipeline}
      isLoading={loading}
      error={error || undefined}
    />
  );
}
