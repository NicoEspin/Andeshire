// store/api/Workflows/fetchWorkflowDetail.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setWorkflow,
  setLoading,
  setError,
} from "@/store/slices/workflows/Id/WorkflowDetailSlice";

/**
 * 🚀 Fetch del Workflow Detail.
 * - Por ahora GET a /workflowDetail (sin ID)
 * - Si en el futuro necesitas pasar un ID => descomenta workflowId y usa params
 */

export const fetchWorkflowDetail = async (
  dispatch: AppDispatch,
  workflowId?: string // ⚡ Param opcional, por ahora no usado
) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await api.get("/workflowDetail", {
      // params: workflowId ? { id: workflowId } : undefined,
    });

    console.log("API Response:", response.data);

    if (response.data.success) {
      dispatch(setWorkflow(response.data.data));
    } else {
      dispatch(setError("Failed to fetch workflow detail"));
    }
  } catch (error: any) {
    console.error("API Error:", error);

    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      dispatch(setError("Network error - please check your connection"));
    } else {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load workflow detail";
      dispatch(setError(errorMessage));
    }
  } finally {
    dispatch(setLoading(false));
  }
};
