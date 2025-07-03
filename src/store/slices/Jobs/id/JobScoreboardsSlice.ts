// src/store/slices/Jobs/id/JobScoreboardsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobScoreboardsResponse, Scoreboard, AvailableTemplate } from "@/app/jobs/[id]/types/ScoreboardsTypes";

interface JobScoreboardsState {
  jobId: string | null;
  jobName: string | null;
  scoreboards: Scoreboard[];
  availableTemplates: AvailableTemplate[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: JobScoreboardsState = {
  jobId: null,
  jobName: null,
  scoreboards: [],
  availableTemplates: [],
  loading: false,
  error: null,
  loaded: false,
};

export const jobScoreboardsSlice = createSlice({
  name: "jobScoreboards",
  initialState,
  reducers: {
    clearJobScoreboards: (state) => {
      state.jobId = null;
      state.jobName = null;
      state.scoreboards = [];
      state.availableTemplates = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setJobScoreboardsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setJobScoreboardsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobScoreboards: (state, action: PayloadAction<JobScoreboardsResponse>) => {
      state.jobId = action.payload.job_id;
      state.jobName = action.payload.job_name;
      state.scoreboards = action.payload.scoreboards;
      state.availableTemplates = action.payload.available_templates;
      state.loaded = true;
    },
  },
});

export const {
  clearJobScoreboards,
  setJobScoreboardsLoading,
  setJobScoreboardsError,
  setJobScoreboards,
} = jobScoreboardsSlice.actions;

export default jobScoreboardsSlice.reducer;
