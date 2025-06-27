// src/types/CandidatesByStagesTypes.ts

export interface CandidatesByStage {
   [stageId: string]: CandidateDetail[];
}

export interface CandidateDetail {
  id: string;
  name: string;
  email: string;
  second_email: string | null;
  phone_number: string;
  phone_extract: string | null;
  category: string;
  technical_resume: string;
  show_technical_resume: string;
  current_job_title: string;
  previous_job_title: string | null;
  years_in_last_job: number | string | null;
  linkedin: string | null;
  other_url: string | null;
  location: string;
  age: number | string | null;
  date_of_birth: string | null;
  avature_id: string | null;
  tech: string;
  latest_update_linkedin: string | null;
  tags: Tag[];
  files: FileAttachment[]; // suponiendo estructura vacía
  technical_comments: TechnicalComment[]; // suponiendo estructura vacía
  candidate_job_stage_id: string;
  current_stage: StageSummary;
  next_possible_stages: StageSummary[];
  stage_history: StageHistory[];
  recruiter: Recruiter;
  updated_at: string;
  created_at: string;
  interview_date_scoreboard: string | null;
}

export interface Tag {
  id: string;
  name: string;
}

export interface FileAttachment {
  // definir si en el futuro se agregan archivos
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
