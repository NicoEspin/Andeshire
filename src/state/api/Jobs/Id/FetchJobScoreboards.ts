// src/state/api/Jobs/Id/FetchJobScoreboards.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setJobScoreboardsLoading,
  setJobScoreboardsError,
  setJobScoreboards,
} from "@/store/slices/Jobs/id/JobScoreboardsSlice";
import { JobScoreboardsResponse } from "@/app/jobs/[id]/types/ScoreboardsTypes";

export const fetchJobScoreboards = async (
  dispatch: AppDispatch,
  jobId: string
) => {
  dispatch(setJobScoreboardsLoading(true));
  dispatch(setJobScoreboardsError(null));

  try {
    const response = await api.get<JobScoreboardsResponse>(`/job-scoreboards`);
    dispatch(setJobScoreboards(response.data));
  } catch (error: any) {
    console.error("API Error:", error);
    dispatch(
      setJobScoreboardsError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load Job Scoreboards"
      )
    );
  } finally {
    dispatch(setJobScoreboardsLoading(false));
  }
};
