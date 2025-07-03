// src/state/api/fetchJobHeimdall.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setJobHeimdallLoading,
  setJobHeimdallError,
  setJobHeimdall,
} from "@/store/slices/Jobs/id/JobHeimdallSlice";
import { HeimdallApiResponse } from "@/app/jobs/[id]/types/HeimdallTypes";

export const fetchJobHeimdall = async (
//   jobId: string,
  dispatch: AppDispatch,
  page: number = 1,
  order_by: string = "-match_grade",
  candidate_name: string = ""
) => {
  dispatch(setJobHeimdallLoading(true));
  dispatch(setJobHeimdallError(null));

  try {
    const response = await api.get<HeimdallApiResponse>(`/heimdall-analysis`, {
      params: {
        // job_id: jobId,
        page: page,
        order_by: order_by,
        candidate_name: candidate_name || undefined,
      },
    });

    dispatch(setJobHeimdall(response.data));
  } catch (error: any) {
    console.error("API Error:", error);
    dispatch(
      setJobHeimdallError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load Heimdall analysis"
      )
    );
  } finally {
    dispatch(setJobHeimdallLoading(false));
  }
};
