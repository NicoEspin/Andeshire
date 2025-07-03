// src/types/CandidatesByStagesTypes.ts

import { RegularComment } from "./CandidateCommentsTypes";
import { Job, JobStage } from "./JobTypes";

export interface CandidatesByStage {
  [stageId: string]: CandidateDetail[];
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  consulting_firm: string;
}
export interface CandidateExperience {
  id: string;
  company_name: string;
  role_name: string;
  role_description: string;
  duration: string;
  start_time: string | null;
  end_time: string | null;
}
export type CustomField = {
  id: string;
  field_name: string;
  field_type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "tel"
    | "date"
    | "datetime"
    | "time"
    | "checkbox"
    | "radio"
    | "select"
    | "multi_select"
    | "file"
    | "url"
    | "hidden"
    | "password"
    | "range"
    | string; // Para soportar tipos futuros o personalizados
  is_required: "true" | "false";
  placeholder: string | null;
  help_text: string | null;
  options: string[] | null;
  default_value: string | string[] | null;
  order: number;
  value: string | string[] | null;
  has_value: "true" | "false";
};

export interface CandidateDetail {
  id: string;
  uuid: string;
  name: string;
  email: string;
  second_email: string | null;
  phone_number: string;
  phone_extract: string | null;
  category: string;
  country: string;
  city: string | null;
  state_province: string | null;
  location: string;
  age: number | string | null;
  date_of_birth: string | null;
  current_job_title: string;
  previous_job_title: string | null;
  years_in_last_job: number | string | null;
  linkedin: string | null;
  other_url: string | null;
  cv_url: string;
  technical_resume: string;
  show_technical_resume: string;
  tech: string;
  avature_id: string | null;
  latest_update_linkedin: string | null;
  tags: Tag[];
  files: FileAttachment[];
  regular_comments: RegularComment[];
  technical_comments: TechnicalComment[];
  candidate_job_stage_id: string;
  current_stage: StageSummary;
  next_possible_stages: StageSummary[];
  stage_history: StageHistory[];
  recruiter: Recruiter;
  job_stages: JobStage[];
  updated_at: string;
  created_at: string;
  interview_date_scoreboard: string | null;
  jobs: Job[];
  experiences?: CandidateExperience[];

  custom_fields?: CustomField[]; // ✅ Campo agregado
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface FileAttachment {
  id: string;
  filename: string;
  description: string;
  uploaded_at: string;
  url: string;
}

export interface TechnicalComment {
  // definir si en el futuro se agregan comentarios técnicos
}

export interface StageSummary {
  id: string;
  name: string;
  order: number;
  status_options: string[]; // o ajustable si son objetos más adelante
}

export interface StageHistory {
  id: string;
  stage_id: string;
  stage_name: string;
  created_at: string;
  updated_at: string;
  recruiter: string;
  scoreboard: string | null;
}

export interface Recruiter {
  id: string;
  name: string;
}
