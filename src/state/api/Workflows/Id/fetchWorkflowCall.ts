// src/state/api/Calls/fetchWorkflowCall.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setWorkflowCallLoading,
  setWorkflowCallError,
  setWorkflowCallTemplates,
} from "@/store/slices/workflows/Id/WorkflowCallSlice";

// Tipo de respuesta de la API
export interface CallTemplatesResponse {
  success: boolean;
  message: string;
  data: {
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
  }[];
}

export const fetchWorkflowCall = async (dispatch: AppDispatch) => {
  dispatch(setWorkflowCallLoading(true));
  dispatch(setWorkflowCallError(null));

  try {
    const response = await api.get<CallTemplatesResponse>(
      "/workflow_call_templates"
    );

    if (response.data?.data) {
      dispatch(setWorkflowCallTemplates(response.data.data));
    } else {
      dispatch(setWorkflowCallTemplates([]));
    }

    dispatch(setWorkflowCallLoading(false));
  } catch (error: any) {
    dispatch(setWorkflowCallError(error.message));
    dispatch(setWorkflowCallLoading(false));
  }
};
