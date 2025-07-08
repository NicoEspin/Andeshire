// store/api/Workflows/fetchWorkflowDetail.ts

import { AppDispatch } from "@/app/redux";
import {
  setWorkflow,
  setLoading,
  setError,
} from "@/store/slices/workflows/Id/WorkflowDetailSlice";

/**
 * 🚀 Fetch del Workflow Detail usando `fetch` nativo.
 * Llama literalmente a:
 * https://andeshire.com/api/edit-template-set/uuid:template_set_id/
 * 
 * Pasa el `templateSetId` como parámetro.
 */

export const fetchWorkflowDetail = async (
  dispatch: AppDispatch,
  templateSetId: string // Ahora sí obligatorio para construir la URL
) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await fetch(
      `https://andeshire.com/api/edit-template-set/uuid:${templateSetId}/`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("API Response:", responseData);

    if (responseData.success) {
      dispatch(setWorkflow(responseData.data));
    } else {
      dispatch(setError("Failed to fetch workflow detail"));
    }
  } catch (error: any) {
    console.error("API Error:", error);

    if (error.name === "TypeError") {
      dispatch(setError("Network error - please check your connection"));
    } else {
      dispatch(setError(error.message || "Failed to load workflow detail"));
    }
  } finally {
    dispatch(setLoading(false));
  }
};
