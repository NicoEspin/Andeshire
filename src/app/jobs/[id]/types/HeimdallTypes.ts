export interface HeimdallApiResponse {
  job_id: string;
  analysis_process: HeimdallAnalysisProcess;
  candidates: HeimdallCandidate[];
  filters: HeimdallFilters;
  pagination: HeimdallPagination;
  total_candidates_analyzed: number;
}

export interface HeimdallAnalysisProcess {
  id: string;
  status: "COMPLETED" | "PROCESSING" | "FAILED" | string;
  total_candidates: number;
  processed_candidates: number;
  error_candidates: number;
  started_at: string; // ISO date
  completed_at: string; // ISO date
  error_message: string;
  recruiter_name: string | null;
}

export interface HeimdallCandidate {
  id: string;
  candidate_id: string;
  candidate_name: string;
  email: string;
  current_job_title: string;
  phone_number: string;
  skills_grade: number;
  match_grade: number;
  adaptability_grade: number;
  key_points: string; // Puede contener HTML
  recruiter_name: string | null;
  created_at: string;
  is_hidden: "true" | "false";
  linkedin: string | null;
  location: string | null;
  country: string;
  state_province: string | null;
  city: string | null;
  categorization_heimdall: "true" | "false";
  heimdall: "APLICA FUERTEMENTE" | "APLICA" | "NO APLICA" | string;
  strong_result: "APLICA FUERTEMENTE" | "APLICA" | "NO APLICA" | string;
}

export interface HeimdallFilters {
  candidate_name: string;
  order_by: string;
}

export interface HeimdallPagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
  has_next: "true" | "false";
  has_previous: "true" | "false";
}
