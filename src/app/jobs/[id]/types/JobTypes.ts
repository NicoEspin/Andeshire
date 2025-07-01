import type { Stage } from "./StagesTypes";

/** 📌 Job API Response */
export interface JobApiResponse {
  status: string;
  job: Job;
}

/** 📌 Archivos del Job */
export interface JobFile {
  id: string;
  filename: string;
  description: string;
  uploaded_at: string;
  url: string;
}

/** 📌 Estructura principal del Job */
export interface Job {
  id: string;
  stages?: Stage[];
  title: string;
  company: Company;
  description: string;
  location: string;
  modality: string;
  technical_requirements: TechnicalRequirements;
  place_id: string;
  visible_id: string;
  stage_template_set: StageTemplateSet;
  technical_info: string;
  questions: string;
  english_level: string;
  category: string;
  created_at: string;
  updated_at: string;
  tech: string;
  priority: string;
  public_title: string;
  public_description: string;
  public_scoreboard_template_id: string | null;
  is_public: string;
  is_open: string;
  positions: number;
  tags: string[];
  files: JobFile[];
  salary_min: string;
  salary_max: string;
  salary_expected: string;
  currency: string;
  place_of_work: string;
  job_perks: string;
  scoreboards: Scoreboard[];
}

/** ✅ Nueva estructura: JobStage, basado en la response real */
export interface JobStage {
  id: string;
  job: JobStageJob;
  current_stage: StageBase;
  next_possible_stages: StageBase[];
  stage_history: StageHistory[];
  recruiter: Recruiter;
  created_at: string;
  updated_at: string;
}

export interface JobStageJob {
  id: string;
  title: string;
  company: string;
  description: string;
}

export interface StageBase {
  id: string;
  name: string;
  order: number;
}

export interface StageHistory {
  id: string;
  stage_id: string;
  stage_name: string;
  created_at: string;
  updated_at: string;
  recruiter: Recruiter;
  scoreboard: string | null; // En tu JSON aparece como null
  scoreboards: ScoreboardDetail[]; // Array real de formularios
}

export interface ScoreboardDetail {
  id: string;
  template: {
    id: string;
    name: string;
    description: string;
  };
  public: string;
  public_link: string | null;
  public_url: string | null;
  by_admin: string;
  to_complete: string;
  created_at: string;
  updated_at: string;
  entries: Record<string, string>;
  responses: any[];
}

export interface Recruiter {
  id: string;
  name: string;
}

/** 📌 Scoreboard general que sigue usando tu Job */
export interface Scoreboard {
  id: string;
  template_name: string;
  recruiter_name: string;
  to_complete: boolean;
  created_at: string;
  updated_at: string;
  entries: [];
}

export interface Company {
  id: string;
  name: string;
}

export interface TechnicalRequirements {
  technologies: {
    [key: string]: {
      years: number;
      months: number;
    };
  };
}

export interface StageTemplateSet {
  id: string;
  name: string;
}
