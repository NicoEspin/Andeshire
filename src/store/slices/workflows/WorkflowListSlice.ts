// src/store/slices/Workflows/WorkflowListSlice.ts

import { WorkflowItem, WorkflowListResponse } from "@/app/Types/Workflow/WorkflowListTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface WorkflowListState {
  list: WorkflowItem[];
  loading: boolean;
  error: string | null;
  pagination: WorkflowListResponse["pagination"];
}

const initialState: WorkflowListState = {
  list: [],
  loading: false,
  error: null,
  pagination: {
    total_items: 0,
    total_pages: 1,
    current_page: 1,
    items_per_page: 10,
    has_next: null,
    has_previous: null,
  },
};

export const workflowListSlice = createSlice({
  name: "workflowList",
  initialState,
  reducers: {
    clearWorkflowList: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
      state.pagination = {
        total_items: 0,
        total_pages: 1,
        current_page: 1,
        items_per_page: 10,
        has_next: null,
        has_previous: null,
      };
    },
    setWorkflowListLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWorkflowListError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWorkflowList: (state, action: PayloadAction<WorkflowListResponse>) => {
      state.list = action.payload.workflows;
      state.pagination = action.payload.pagination;
    },
  },
});

export const {
  clearWorkflowList,
  setWorkflowList,
  setWorkflowListLoading,
  setWorkflowListError,
} = workflowListSlice.actions;

export default workflowListSlice.reducer;
