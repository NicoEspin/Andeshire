// src/store/slices/Jobs/id/JobStagesSlice.ts

import { JobStage, JobStagesApiResponse } from "@/app/jobs/[id]/types/StagesTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface JobStagesState {
  stages: JobStage[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: JobStagesState = {
  stages: [],
  loading: false,
  error: null,
  loaded: false,
};

export const jobStagesSlice = createSlice({
  name: "jobStages",
  initialState,
  reducers: {
    clearJobStages: (state) => {
      state.stages = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setJobStagesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setJobStagesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobStages: (state, action: PayloadAction<JobStagesApiResponse>) => {
      state.stages = action.payload;
      state.loaded = true;
    },
  },
});

export const {
  clearJobStages,
  setJobStagesLoading,
  setJobStagesError,
  setJobStages,
} = jobStagesSlice.actions;

export default jobStagesSlice.reducer;
