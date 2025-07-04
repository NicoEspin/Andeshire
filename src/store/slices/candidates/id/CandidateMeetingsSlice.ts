import { CandidateMeeting, CandidateMeetingsResponse } from "@/app/jobs/[id]/types/CandidateMeetingsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CandidateMeetingsState {
  candidateId: string | null;
  meetings: CandidateMeeting[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: CandidateMeetingsState = {
  candidateId: null,
  meetings: [],
  loading: false,
  error: null,
  loaded: false,
};

export const candidateMeetingsSlice = createSlice({
  name: "candidateMeetings",
  initialState,
  reducers: {
    clearCandidateMeetings: (state) => {
      state.candidateId = null;
      state.meetings = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setCandidateMeetingsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCandidateMeetingsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCandidateMeetings: (state, action: PayloadAction<CandidateMeetingsResponse>) => {
      state.candidateId = action.payload.candidate_id;
      state.meetings = action.payload.meetings;
      state.loaded = true;
    },
  },
});

export const {
  clearCandidateMeetings,
  setCandidateMeetingsLoading,
  setCandidateMeetingsError,
  setCandidateMeetings,
} = candidateMeetingsSlice.actions;

export default candidateMeetingsSlice.reducer;
