// src/store/slices/workflows/Id/WorkflowCallSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1️⃣ Tipo de template de llamada (Call)
export interface CallTemplate {
  id: string;
  name: string;
  description: string;
  first_message: string;
  prompt: string;
  max_attempts: number;
  interval_minutes: number;
  ask_permission: boolean;
  created_at: string;
  updated_at: string;
  recruiter_id: string;
}

// 2️⃣ Estado inicial
interface WorkflowCallState {
  templates: CallTemplate[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: WorkflowCallState = {
  templates: [],
  loading: false,
  error: null,
  loaded: false,
};

// 3️⃣ Slice
export const workflowCallSlice = createSlice({
  name: "workflowCall",
  initialState,
  reducers: {
    clearWorkflowCall: (state) => {
      state.templates = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setWorkflowCallLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWorkflowCallError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkflowCallTemplates: (
      state,
      action: PayloadAction<CallTemplate[]>
    ) => {
      state.templates = action.payload;
      state.loaded = true;
    },
  },
});

// 4️⃣ Exports
export const {
  clearWorkflowCall,
  setWorkflowCallLoading,
  setWorkflowCallError,
  setWorkflowCallTemplates,
} = workflowCallSlice.actions;

export default workflowCallSlice.reducer;
