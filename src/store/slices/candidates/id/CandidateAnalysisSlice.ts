// src/store/slices/candidates/id/CandidateAnalysisSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateAnalysesResponse, CandidateAnalysis } from "@/app/jobs/[id]/types/CandidateAnalysisTypes";

interface CandidateAnalysisState {
  analyses: CandidateAnalysis[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: CandidateAnalysisState = {
  analyses: [],
  loading: false,
  error: null,
  loaded: false,
};

export const candidateAnalysisSlice = createSlice({
  name: "candidateAnalysis",
  initialState,
  reducers: {
    clearCandidateAnalyses: (state) => {
      state.analyses = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setCandidateAnalysesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCandidateAnalysesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCandidateAnalyses: (state, action: PayloadAction<CandidateAnalysesResponse>) => {
      state.analyses = action.payload.analyses;
      state.loaded = true;
    },
  },
});

export const {
  clearCandidateAnalyses,
  setCandidateAnalysesLoading,
  setCandidateAnalysesError,
  setCandidateAnalyses,
} = candidateAnalysisSlice.actions;

export default candidateAnalysisSlice.reducer;
