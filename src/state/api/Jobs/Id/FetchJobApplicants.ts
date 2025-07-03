// src/state/api/Jobs/Id/FetchJobApplicants.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setJobApplicants,
  setJobApplicantsLoading,
  setJobApplicantsError,
} from "@/store/slices/Jobs/id/JobApplicantsSlice";
import { ApplicantsApiResponse } from "@/app/jobs/[id]/types/ApplicantsTypes";

/**
 * Fetch job applicants without using thunk
 * @param dispatch Redux dispatch
 * @param jobId Job ID to fetch
 * @param page Pagination page
 * @param order_by Sorting order
 * @param candidate_name Optional search filter
 */
export const fetchJobApplicants = async (
  dispatch: AppDispatch,
  jobId: string,
  page: number = 1,
  order_by: string = "-match_grade",
  candidate_name: string = ""
) => {
  dispatch(setJobApplicantsLoading(true));
  dispatch(setJobApplicantsError(null));

  try {
    const response = await api.get<ApplicantsApiResponse>(
      `/applicants-job`,
      {
       
      }
    );

    dispatch(setJobApplicants(response.data));
  } catch (error: any) {
    console.error("API Error:", error);
    dispatch(
      setJobApplicantsError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load job applicants"
      )
    );
  } finally {
    dispatch(setJobApplicantsLoading(false));
  }
};
