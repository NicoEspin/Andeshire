// types/WorkflowDetailTypes.ts

export interface TemplateSet {
  id: string;
  name: string;
  recruiter_id: string;
  consulting_firm_id: string;
}

export interface Action {
  id: string;
  action_type: string;
  template_id: string | boolean;
  email_template_id: string | boolean;
  scoreboard_template_id: string | boolean;
  scoreboard_scope: string;
  call_template_id: string | boolean;
  whatsapp_agent_id: string | boolean | number;
  executor: string;
  delay_minutes: number;
  interview_minutes: number;
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  description: string;
  status_options: string[];
  actions: Action[];
  next_possible_stages: string[];
}

export interface WhatsappTemplate {
  id: string;
  name: string;
  content: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export interface CallTemplate {
  id: string;
  name: string;
  description: string;
}

export interface WhatsappAgent {
  id: number;
  name: string | boolean;
  prompt: string;
}

export interface ScoreboardTemplate {
  id: string;
  name: string;
  description: string;
}

export interface Templates {
  whatsapp_templates: WhatsappTemplate[];
  email_templates: EmailTemplate[];
  call_templates: CallTemplate[];
  whatsapp_agents: WhatsappAgent[];
  scoreboard_templates: ScoreboardTemplate[];
}

export interface WorkflowDetail {
  template_set: TemplateSet;
  stages: Stage[];
  templates: Templates;
}
