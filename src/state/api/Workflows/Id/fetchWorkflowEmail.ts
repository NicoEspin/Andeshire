// src/state/api/Emails/fetchWorkflowEmail.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setWorkflowEmailLoading,
  setWorkflowEmailError,
  setWorkflowEmailTemplates,
} from "@/store/slices/workflows/Id/WorkflowEmailSlice";

// Tipo de respuesta de la API
export interface EmailTemplatesResponse {
  success: boolean | null;
  message: string;
  data: {
    id: string;
    name: string;
    subject: string;
    content: string;
    created_at: string;
    updated_at: string;
    recruiter_id: string;
  }[];
}

export const fetchWorkflowEmail = async (dispatch: AppDispatch) => {
  dispatch(setWorkflowEmailLoading(true));
  dispatch(setWorkflowEmailError(null));

  try {
    const response = await api.get<EmailTemplatesResponse>(
      "/workflow_email_templates"
    );

    if (response.data?.data) {
      dispatch(setWorkflowEmailTemplates(response.data.data));
    } else {
      dispatch(setWorkflowEmailTemplates([]));
    }

    dispatch(setWorkflowEmailLoading(false));
  } catch (error: any) {
    dispatch(setWorkflowEmailError(error.message));
    dispatch(setWorkflowEmailLoading(false));
  }
};
