// src/state/api/fetchJobStages.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setJobStagesLoading,
  setJobStagesError,
  setJobStages,
} from "@/store/slices/Jobs/id/JobStagesSlice";
import { JobStagesApiResponse } from "@/app/jobs/[id]/types/StagesTypes";

export const fetchJobStages = async (
  // jobId: string,
  dispatch: AppDispatch
) => {
  dispatch(setJobStagesLoading(true));
  dispatch(setJobStagesError(null));

  try {
    const response = await api.get<JobStagesApiResponse>(`/getStagesOfAJob`, {
      params: {
        // job_id: jobId
      },
    });

    dispatch(setJobStages(response.data));
  } catch (error: any) {
    console.error("API Error:", error);
    dispatch(
      setJobStagesError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load job stages"
      )
    );
  } finally {
    dispatch(setJobStagesLoading(false));
  }
};
