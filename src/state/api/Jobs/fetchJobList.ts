// src/state/api/fetchJobList.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import { JobListResponse } from "@/app/jobs/[id]/types/JobTypes";
import {
  setJobList,
  setJobListLoading,
  setJobListError,
  setJobListFiltersApplied,
} from "@/store/slices/Jobs/JobListSlice";

export const fetchJobList = async (
  dispatch: AppDispatch,
  filters: Record<string, any> = {}
) => {
  dispatch(setJobListLoading(true));
  dispatch(setJobListError(null));
  dispatch(setJobListFiltersApplied(filters)); // ✅ Guarda filtros aplicados

  try {
    const response = await api.get("/job_list", { params: filters });
    console.log("Job List API Response:", response.data);

    const data: JobListResponse = {
      results: response.data.results || [],
      count: response.data.count || 0,
      next: response.data.next || null,
      previous: response.data.previous || null,
      total_pages: response.data.total_pages || 0,
      current_page: response.data.current_page || 1,
      page_size: response.data.page_size || 0,
      filters: response.data.filters || {
        categories: [],
        companies: [],
        tags: [],
        recruiters: [],
        countries: [],
        cities: [],
        state_provinces: [],
      },
    };

    dispatch(setJobList(data));
  } catch (error: any) {
    console.error("Job List API Error:", error);
    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      dispatch(setJobListError("Network error - please check your connection"));
    } else {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch job list";
      dispatch(setJobListError(errorMessage));
    }
  } finally {
    dispatch(setJobListLoading(false));
  }
};
