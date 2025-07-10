// src/store/slices/whatsapp/WhatsappAgentSlice.ts

import { WhatsappAgent } from "@/app/Types/Workflow/WhatsappAgentTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface WhatsappAgentState {
  agents: WhatsappAgent[];
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialState: WhatsappAgentState = {
  agents: [],
  loading: false,
  error: null,
  loaded: false,
};

export const whatsappAgentSlice = createSlice({
  name: "whatsappAgent",
  initialState,
  reducers: {
    clearWhatsappAgents: (state) => {
      state.agents = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setWhatsappAgentsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWhatsappAgentsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWhatsappAgents: (state, action: PayloadAction<WhatsappAgent[]>) => {
      state.agents = action.payload;
      state.loaded = true;
    },
  },
});

export const {
  clearWhatsappAgents,
  setWhatsappAgentsLoading,
  setWhatsappAgentsError,
  setWhatsappAgents,
} = whatsappAgentSlice.actions;

export default whatsappAgentSlice.reducer;
