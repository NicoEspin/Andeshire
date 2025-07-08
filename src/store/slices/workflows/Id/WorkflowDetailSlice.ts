// store/slices/WorkflowDetailSlice.ts

import { WorkflowDetail } from "@/app/Types/Workflow/WorkflowDetailTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkflowDetailState {
  workflow: WorkflowDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkflowDetailState = {
  workflow: null,
  loading: false,
  error: null,
};

const workflowDetailSlice = createSlice({
  name: "workflowDetail",
  initialState,
  reducers: {
    setWorkflow: (state, action: PayloadAction<WorkflowDetail>) => {
      state.workflow = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearWorkflow: (state) => {
      state.workflow = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setWorkflow, setLoading, setError, clearWorkflow } =
  workflowDetailSlice.actions;

export default workflowDetailSlice.reducer;
