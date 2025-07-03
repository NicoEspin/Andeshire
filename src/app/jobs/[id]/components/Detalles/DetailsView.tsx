"use client";

import React from "react";
import { Job } from "../../types/JobTypes";
import JobGeneralInfoCard from "./JobGeneralInfoCard";
import JobValidationCriteriaCard from "./JobValidationCriteriaCard";
import CandidatesPerWorkflowChart from "./CandidatesPerWorkflowChart";
import { Stage } from "../../types/StagesTypes";
import FilesJobs from "./FilesJobs";
import JobForms from "./Scoreboards/JobForms";

interface DetailsViewProps {
  job: Job;
  stages: Stage[];
}

const DetailsView = ({ job, stages }: DetailsViewProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <JobGeneralInfoCard job={job} />
      <JobValidationCriteriaCard job={job} />

      <div className="md:col-span-2">
        <CandidatesPerWorkflowChart stages={stages} />
      </div>
      <FilesJobs job={job} />
      <JobForms />
    </div>
  );
};

export default DetailsView;
