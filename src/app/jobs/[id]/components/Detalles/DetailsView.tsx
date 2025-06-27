"use client";

import React from "react";
import { Job } from "../../types/JobTypes";
import JobGeneralInfoCard from "./JobGeneralInfoCard";
import JobValidationCriteriaCard from "./JobValidationCriteriaCard";

interface DetailsViewProps {
  job: Job;
}

const DetailsView = ({ job }: DetailsViewProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <JobGeneralInfoCard job={job} />
      <JobValidationCriteriaCard job={job} />
    </div>
  );
};

export default DetailsView;
