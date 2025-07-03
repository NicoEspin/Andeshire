import {
  AvailableTemplate,
  CandidateScoreboard,
  CandidateScoreboardsResponse,
} from "@/app/jobs/[id]/types/ScoreboardsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CandidateScoreboardsState {
  candidateId: string | null;
  candidateName: string | null;
  scoreboards: CandidateScoreboard[];
  availableTemplates: AvailableTemplate[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: CandidateScoreboardsState = {
  candidateId: null,
  candidateName: null,
  scoreboards: [],
  availableTemplates: [],
  loading: false,
  error: null,
  loaded: false,
};

export const candidateScoreboardsSlice = createSlice({
  name: "candidateScoreboards",
  initialState,
  reducers: {
    clearCandidateScoreboards: (state) => {
      state.candidateId = null;
      state.candidateName = null;
      state.scoreboards = [];
      state.availableTemplates = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setCandidateScoreboardsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCandidateScoreboardsError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
    setCandidateScoreboards: (
      state,
      action: PayloadAction<CandidateScoreboardsResponse>
    ) => {
      state.candidateId = action.payload.candidate_id;
      state.candidateName = action.payload.candidate_name;
      state.scoreboards = action.payload.scoreboards;
      state.availableTemplates = action.payload.available_templates;
      state.loaded = true;
    },
  },
});

export const {
  clearCandidateScoreboards,
  setCandidateScoreboardsLoading,
  setCandidateScoreboardsError,
  setCandidateScoreboards,
} = candidateScoreboardsSlice.actions;

export default candidateScoreboardsSlice.reducer;
