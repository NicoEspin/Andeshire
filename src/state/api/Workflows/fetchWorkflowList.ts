// src/state/api/fetchWorkflowList.ts

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
    const response = await fetch("https://andeshire.com/api/v1/workflows/?page=1&per_page=10");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Workflow List API Response:", responseData);

    const data: WorkflowListResponse = {
      workflows: responseData.workflows || [],
      pagination: {
        total_items: responseData.pagination?.total_items || 0,
        total_pages: responseData.pagination?.total_pages || 1,
        current_page: responseData.pagination?.current_page || 1,
        items_per_page: responseData.pagination?.items_per_page || 10,
        has_next: responseData.pagination?.has_next ?? null,
        has_previous: responseData.pagination?.has_previous ?? null,
      },
    };

    dispatch(setWorkflowList(data));
  } catch (error: any) {
    console.error("Workflow List API Error:", error);
    if (error.name === "TypeError") {
      dispatch(setWorkflowListError("Network error - please check your connection"));
    } else {
      dispatch(setWorkflowListError(error.message || "Failed to fetch workflow list"));
    }
  } finally {
    dispatch(setWorkflowListLoading(false));
  }
};
