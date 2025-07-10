// src/state/api/Scoreboards/fetchWorkflowScoreboards.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setWorkflowScoreboardsLoading,
  setWorkflowScoreboardsError,
  setWorkflowScoreboardsTemplates,
} from "@/store/slices/workflows/Id/WorkflowScoreboardsSlice";

// Tipo de respuesta de la API
export interface ScoreboardsTemplatesResponse {
  success: boolean | null;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    by_admin: boolean;
    recruiter_id: string;
  }[];
}

export const fetchWorkflowScoreboards = async (dispatch: AppDispatch) => {
  dispatch(setWorkflowScoreboardsLoading(true));
  dispatch(setWorkflowScoreboardsError(null));

  try {
    const response = await api.get<ScoreboardsTemplatesResponse>("/workflow_scoreboards_templats");

    if (response.data?.data) {
      dispatch(setWorkflowScoreboardsTemplates(response.data.data));
    } else {
      dispatch(setWorkflowScoreboardsTemplates([]));
    }

    dispatch(setWorkflowScoreboardsLoading(false));
  } catch (error: any) {
    dispatch(setWorkflowScoreboardsError(error.message));
    dispatch(setWorkflowScoreboardsLoading(false));
  }
};
