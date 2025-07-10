// src/store/slices/workflows/Id/WorkflowEmailSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1️⃣ Tipo de template de Email
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
  recruiter_id: string;
}

// 2️⃣ Estado inicial
interface WorkflowEmailState {
  templates: EmailTemplate[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: WorkflowEmailState = {
  templates: [],
  loading: false,
  error: null,
  loaded: false,
};

// 3️⃣ Slice
export const workflowEmailSlice = createSlice({
  name: "workflowEmail",
  initialState,
  reducers: {
    clearWorkflowEmail: (state) => {
      state.templates = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setWorkflowEmailLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWorkflowEmailError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkflowEmailTemplates: (
      state,
      action: PayloadAction<EmailTemplate[]>
    ) => {
      state.templates = action.payload;
      state.loaded = true;
    },
  },
});

// 4️⃣ Exports
export const {
  clearWorkflowEmail,
  setWorkflowEmailLoading,
  setWorkflowEmailError,
  setWorkflowEmailTemplates,
} = workflowEmailSlice.actions;

export default workflowEmailSlice.reducer;
