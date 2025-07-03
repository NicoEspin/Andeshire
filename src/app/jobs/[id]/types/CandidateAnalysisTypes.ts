// src/app/jobs/[id]/types/CandidateAnalysisTypes.ts

export interface CandidateAnalysis {
  id: string;
  job_id: string;
  job_title: string;
  recruiter_id: string | null;
  recruiter_name: string | null;
  skills_grade: number;
  match_grade: number;
  adaptability_grade: number;
  key_points: string; // HTML
  heimdall: "APLICA FUERTEMENTE" | "APLICA" | "NO APLICA" | string;
  created_at: string; // ISO
  updated_at: string; // ISO
}

export interface CandidateAnalysesResponse {
  analyses: CandidateAnalysis[];
}
