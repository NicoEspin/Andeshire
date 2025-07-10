// src/types/WhatsappAgentTypes.ts

export interface WhatsappAgent {
  id: string;
  name: string | null;
  prompt: string;
  task: string;
  first_message: string;
  direction: string;
  status: string;
  created_at: string;
  updated_at: string;
  recruiter_id: string;
}

export interface WhatsappAgentResponse {
  success: boolean | null;
  message: string;
  data: WhatsappAgent[];
}
