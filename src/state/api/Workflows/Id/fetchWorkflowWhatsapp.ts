// src/state/api/Whatsapp/fetchWorkflowWhatsapp.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setWorkflowWhatsappLoading,
  setWorkflowWhatsappError,
  setWorkflowWhatsappTemplates,
} from "@/store/slices/workflows/Id/WorkflowWhatsappSlice";

// Define el tipo de respuesta
export interface WhatsappTemplatesResponse {
  success: boolean | null;
  message: string;
  data: {
    id: string;
    name: string;
    content: string;
    created_at: string;
    updated_at: string;
    recruiter_id: string;
  }[];
}

export const fetchWorkflowWhatsapp = async (dispatch: AppDispatch) => {
  dispatch(setWorkflowWhatsappLoading(true));

  try {
    const response = await api.get<WhatsappTemplatesResponse>("/workflow_whatsapp_templates");

    if (response.data?.data) {
      dispatch(setWorkflowWhatsappTemplates(response.data.data));
    } else {
      dispatch(setWorkflowWhatsappTemplates([]));
    }
    dispatch(setWorkflowWhatsappLoading(false));
  } catch (error: any) {
    dispatch(setWorkflowWhatsappError(error.message));
    dispatch(setWorkflowWhatsappLoading(false));
  }
};
