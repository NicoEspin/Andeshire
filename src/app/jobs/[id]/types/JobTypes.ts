import type { Stage } from "./StagesTypes";

export interface JobApiResponse {
  status: string;
  job: Job;
}
export interface JobFile {
  id: string;
  filename: string;
  description: string;
  uploaded_at: string;
  url: string;
}

export interface JobStageJob {
  id: string;
  title: string;
  company: string;
  description: string;
}

export interface JobStage {
  id: string;
  job: JobStageJob;
}

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
