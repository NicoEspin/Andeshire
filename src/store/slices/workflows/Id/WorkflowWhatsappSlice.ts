// src/store/slices/workflows/Id/WorkflowWhatsappSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 👇 Define tu tipo (adáptalo a tu estructura real)
export interface WhatsappTemplate {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  recruiter_id: string;
}

interface WorkflowWhatsappState {
  templates: WhatsappTemplate[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: WorkflowWhatsappState = {
  templates: [],
  loading: false,
  error: null,
  loaded: false,
};

export const workflowWhatsappSlice = createSlice({
  name: "workflowWhatsapp",
  initialState,
  reducers: {
    clearWorkflowWhatsapp: (state) => {
      state.templates = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setWorkflowWhatsappLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWorkflowWhatsappError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkflowWhatsappTemplates: (
      state,
      action: PayloadAction<WhatsappTemplate[]>
    ) => {
      state.templates = action.payload;
      state.loaded = true;
    },
  },
});

export const {
  clearWorkflowWhatsapp,
  setWorkflowWhatsappLoading,
  setWorkflowWhatsappError,
  setWorkflowWhatsappTemplates,
} = workflowWhatsappSlice.actions;

export default workflowWhatsappSlice.reducer;
