// src/store/slices/candidates/id/CandidateCommentsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateCommentsResponse, RegularComment, TechnicalComment } from "@/app/jobs/[id]/types/CandidateCommentsTypes";

interface CandidateCommentsState {
  regularComments: RegularComment[];
  technicalComments: TechnicalComment[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: CandidateCommentsState = {
  regularComments: [],
  technicalComments: [],
  loading: false,
  error: null,
  loaded: false,
};

export const candidateCommentsSlice = createSlice({
  name: "candidateComments",
  initialState,
  reducers: {
    clearCandidateComments: (state) => {
      state.regularComments = [];
      state.technicalComments = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setCandidateCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCandidateCommentsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCandidateComments: (state, action: PayloadAction<CandidateCommentsResponse>) => {
      state.regularComments = action.payload.data.regular_comments;
      state.technicalComments = action.payload.data.technical_comments;
      state.loaded = true;
    },
  },
});

export const {
  clearCandidateComments,
  setCandidateCommentsLoading,
  setCandidateCommentsError,
  setCandidateComments,
} = candidateCommentsSlice.actions;

export default candidateCommentsSlice.reducer;
