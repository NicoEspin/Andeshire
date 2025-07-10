// src/state/api/Whatsapp/fetchWhatsappAgent.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setWhatsappAgentsLoading,
  setWhatsappAgentsError,
  setWhatsappAgents,
} from "@/store/slices/workflows/Id/WhatsappAgentSlice"
import { WhatsappAgentResponse } from "@/app/Types/Workflow/WhatsappAgentTypes";


export const fetchWhatsappAgents = async (dispatch: AppDispatch) => {
  dispatch(setWhatsappAgentsLoading(true));
  try {
    const response = await api.get<WhatsappAgentResponse>(
      "/workflow_whatsapp_agents_templates"
    );

    if (response.data?.data) {
      dispatch(setWhatsappAgents(response.data.data));
    } else {
      dispatch(setWhatsappAgents([]));
    }

    dispatch(setWhatsappAgentsLoading(false));
  } catch (error: any) {
    dispatch(setWhatsappAgentsError(error.message));
    dispatch(setWhatsappAgentsLoading(false));
  }
};
