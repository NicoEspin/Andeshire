// src/store/slices/Jobs/JobListSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobListItem, JobListResponse } from "@/app/jobs/[id]/types/JobTypes";

interface JobListState {
  list: JobListItem[];
  loading: boolean;
  error: string | null;
  count: number;
  currentPage: number;
  totalPages: number;
  filters: JobListResponse["filters"]; // ✅ NUEVO
  filters_applied: Record<string, any>; // ✅ NUEVO
}

const initialState: JobListState = {
  list: [],
  loading: false,
  error: null,
  count: 0,
  currentPage: 1,
  totalPages: 1,
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
};

export const jobListSlice = createSlice({
  name: "jobList",
  initialState,
  reducers: {
    clearJobList: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.count = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.filters = {
        categories: [],
        companies: [],
        tags: [],
        recruiters: [],
        countries: [],
        cities: [],
        state_provinces: [],
      };
      state.filters_applied = {};
    },
    setJobListLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setJobListError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobList: (state, action: PayloadAction<JobListResponse>) => {
      state.list = action.payload.results;
      state.count = action.payload.count;
      state.currentPage = action.payload.current_page;
      state.totalPages = action.payload.total_pages;
      state.filters = action.payload.filters; // ✅ GUARDA FILTROS API
    },
    setJobListFiltersApplied: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.filters_applied = action.payload; // ✅ GUARDA FILTROS APLICADOS
    },
  },
});

export const {
  clearJobList,
  setJobList,
  setJobListLoading,
  setJobListError,
  setJobListFiltersApplied,
} = jobListSlice.actions;

export default jobListSlice.reducer;
