import { CustomField } from "./CandidatesByStagesTypes";
import { Scoreboard, ScoreboardDetail } from "./ScoreboardsTypes";
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
  custom_fields: CustomField[];
}
export interface JobNote {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  last_modified_by: string | null;
  last_modified_at: string | null;
}

export interface JobListItem {
  id: string;
  pk: string;
  title: string;
  description: string;
  category: string;
  company: Company; // ya tienes este type ✔️
  is_public: boolean;
  is_open: boolean;
  positions: number;
  created_at: string;
  updated_at: string;
  is_job_analyzed: boolean;
  applicant_count: number;
  candidate_count: number;
  priority: string;
  note: JobNote | null; // ✅ ahora usa el nuevo type
  visible_id: string;
}

export interface JobListResponse {
  results: JobListItem[];
  count: number;
  next: number | null;
  previous: number | null;
  total_pages: number;
  current_page: number;
  page_size: number;
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



export interface Recruiter {
  id: string;
  name: string;
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
