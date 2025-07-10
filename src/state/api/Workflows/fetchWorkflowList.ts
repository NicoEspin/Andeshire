// src/state/api/fetchWorkflowList.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";

import {
  setWorkflowList,
  setWorkflowListLoading,
  setWorkflowListError,
} from "@/store/slices/workflows/WorkflowListSlice";
import { WorkflowListResponse } from "@/app/Types/Workflow/WorkflowListTypes";

export const fetchWorkflowList = async (dispatch: AppDispatch) => {
  dispatch(setWorkflowListLoading(true));
  dispatch(setWorkflowListError(null));

  try {
    const response = await api.get("/workflowList");
    console.log("Workflow List API Response:", response.data);

    const data: WorkflowListResponse = {
      workflows: response.data.workflows || [],
      pagination: {
        total_items: response.data.pagination?.total_items || 0,
        total_pages: response.data.pagination?.total_pages || 1,
        current_page: response.data.pagination?.current_page || 1,
        items_per_page: response.data.pagination?.items_per_page || 10,
        has_next: response.data.pagination?.has_next ?? null,
        has_previous: response.data.pagination?.has_previous ?? null,
      },
    };

    dispatch(setWorkflowList(data));
  } catch (error: any) {
    console.error("Workflow List API Error:", error);
    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      dispatch(
        setWorkflowListError("Network error - please check your connection")
      );
    } else {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch workflow list";
      dispatch(setWorkflowListError(errorMessage));
    }
  } finally {
    dispatch(setWorkflowListLoading(false));
  }
};
