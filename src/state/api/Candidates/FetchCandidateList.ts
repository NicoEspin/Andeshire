// src/state/api/Candidates/fetchCandidateList.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";

import { CandidatesFetchResponse } from "@/app/jobs/[id]/types/CandidateFetchTypes";
import {
  setCandidateListLoading,
  setCandidateListError,
  setCandidateList,
  setCandidateFiltersApplied,
} from "@/store/slices/candidates/CandidateListSlice";

export const fetchCandidateList = async (
  dispatch: AppDispatch,
  filters: Record<string, any> = {}
) => {
  dispatch(setCandidateListLoading(true));
  dispatch(setCandidateListError(null));
  dispatch(setCandidateFiltersApplied(filters));

  try {
    const response = await api.get("/candidate-list-v1", {
      params: filters,
    });

    const data: CandidatesFetchResponse = {
      candidates: response.data.candidates || [],
      pagination: response.data.pagination,
      filters: response.data.filters,
      meta: response.data.meta,
    };

    dispatch(setCandidateList(data));
  } catch (error: any) {
    dispatch(setCandidateListError(error.message || "Error al cargar candidatos"));
  } finally {
    dispatch(setCandidateListLoading(false));
  }
};
