// src/store/slices/JobHeimdallSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  HeimdallApiResponse,
  HeimdallAnalysisProcess,
  HeimdallCandidate,
  HeimdallFilters,
  HeimdallPagination,
} from "@/app/jobs/[id]/types/HeimdallTypes";

interface JobHeimdallState {
  jobId: string | null;
  analysisProcess: HeimdallAnalysisProcess | null;
  candidates: HeimdallCandidate[];
  filters: HeimdallFilters | null;
  pagination: HeimdallPagination | null;
  totalCandidatesAnalyzed: number;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: JobHeimdallState = {
  jobId: null,
  analysisProcess: null,
  candidates: [],
  filters: null,
  pagination: null,
  totalCandidatesAnalyzed: 0,
  loading: false,
  error: null,
  loaded: false,
};

export const jobHeimdallSlice = createSlice({
  name: "jobHeimdall",
  initialState,
  reducers: {
    clearJobHeimdall: (state) => {
      state.jobId = null;
      state.analysisProcess = null;
      state.candidates = [];
      state.filters = null;
      state.pagination = null;
      state.totalCandidatesAnalyzed = 0;
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setJobHeimdallLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setJobHeimdallError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobHeimdall: (state, action: PayloadAction<HeimdallApiResponse>) => {
      state.jobId = action.payload.job_id;
      state.analysisProcess = action.payload.analysis_process;
      state.candidates = action.payload.candidates;
      state.filters = action.payload.filters;
      state.pagination = action.payload.pagination;
      state.totalCandidatesAnalyzed = action.payload.total_candidates_analyzed;
      state.loaded = true;
    },
  },
});

export const {
  clearJobHeimdall,
  setJobHeimdallLoading,
  setJobHeimdallError,
  setJobHeimdall,
} = jobHeimdallSlice.actions;

export default jobHeimdallSlice.reducer;
