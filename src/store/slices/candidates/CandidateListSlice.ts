// src/store/slices/Candidates/CandidateListSlice.ts

import {
  Candidate,
  CandidatesFetchResponse,
} from "@/app/jobs/[id]/types/CandidateFetchTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CandidateListState {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
  };
  filters: CandidatesFetchResponse["filters"];
  meta: CandidatesFetchResponse["meta"] | null;
  filters_applied: Record<string, any>; // 🔑
}

const initialState: CandidateListState = {
  candidates: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    page_size: 10,
    total_pages: 1,
  },
  filters: {
    categories: [],
    companies: [],
    tags: [],
    recruiters: [],
    countries: [],
    cities: [],
    state_provinces: [],
  },
  filters_applied: {},
  meta: null,
};

export const candidateListSlice = createSlice({
  name: "candidateList",
  initialState,
  reducers: {
    clearCandidateList: (state) => {
      state.candidates = [];
      state.loading = false;
      state.error = null;
      state.pagination = {
        total: 0,
        page: 1,
        page_size: 10,
        total_pages: 1,
      };

      state.meta = null;
    },
    setCandidateListLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCandidateListError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCandidateList: (
      state,
      action: PayloadAction<CandidatesFetchResponse>
    ) => {
      state.candidates = action.payload.candidates || [];
      state.pagination = action.payload.pagination;
      state.filters = action.payload.filters;
      state.meta = action.payload.meta;
    },
    setCandidateFiltersApplied: (state, action) => {
      state.filters_applied = action.payload;
    },
  },
});

export const {
  clearCandidateList,
  setCandidateListLoading,
  setCandidateListError,
  setCandidateList,
  setCandidateFiltersApplied
} = candidateListSlice.actions;

export default candidateListSlice.reducer;
