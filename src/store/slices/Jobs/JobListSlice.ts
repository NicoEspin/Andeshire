// src/store/slices/JobListSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobListItem, JobListResponse } from "@/app/jobs/[id]/types/JobTypes";

interface JobListState {
  list: JobListItem[];
  loading: boolean;
  error: string | null;
  count: number;
  currentPage: number;
  totalPages: number;
}

const initialState: JobListState = {
  list: [],
  loading: false,
  error: null,
  count: 0,
  currentPage: 1,
  totalPages: 1,
};

export const jobListSlice = createSlice({
  name: "jobList",
  initialState,
  reducers: {
    // ✅ Limpia lista y estados
    clearJobList: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.count = 0;
      state.currentPage = 1;
      state.totalPages = 1;
    },
    // ✅ Maneja loading
    setJobListLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // ✅ Maneja error
    setJobListError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // ✅ Guarda la lista completa
    setJobList: (state, action: PayloadAction<JobListResponse>) => {
      state.list = action.payload.results;
      state.count = action.payload.count;
      state.currentPage = action.payload.current_page;
      state.totalPages = action.payload.total_pages;
    },
  },
});

// ✅ Exporta actions individuales
export const {
  clearJobList,
  setJobList,
  setJobListLoading,
  setJobListError,
} = jobListSlice.actions;

export default jobListSlice.reducer;
