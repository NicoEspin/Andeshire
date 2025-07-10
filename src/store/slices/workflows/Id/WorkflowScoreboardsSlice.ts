// src/store/slices/workflows/Id/WorkflowScoreboardsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define el tipo de un scoreboard template
export interface ScoreboardTemplate {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  by_admin: boolean;
  recruiter_id: string;
}

// Estado inicial
interface WorkflowScoreboardsState {
  templates: ScoreboardTemplate[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: WorkflowScoreboardsState = {
  templates: [],
  loading: false,
  error: null,
  loaded: false,
};

// Slice
export const workflowScoreboardsSlice = createSlice({
  name: "workflowScoreboards",
  initialState,
  reducers: {
    clearWorkflowScoreboards: (state) => {
      state.templates = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setWorkflowScoreboardsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWorkflowScoreboardsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkflowScoreboardsTemplates: (
      state,
      action: PayloadAction<ScoreboardTemplate[]>
    ) => {
      state.templates = action.payload;
      state.loaded = true;
    },
  },
});

// Exports
export const {
  clearWorkflowScoreboards,
  setWorkflowScoreboardsLoading,
  setWorkflowScoreboardsError,
  setWorkflowScoreboardsTemplates,
} = workflowScoreboardsSlice.actions;

export default workflowScoreboardsSlice.reducer;
