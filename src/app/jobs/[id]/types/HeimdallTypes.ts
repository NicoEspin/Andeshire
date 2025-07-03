// ✅ Respuesta principal de la API Heimdall
export interface HeimdallApiResponse {
  job_id: string;
  analysis_process: HeimdallAnalysisProcess;
  candidates: HeimdallCandidate[];
  filters: HeimdallFilters;
  pagination: HeimdallPagination;
  total_candidates_analyzed: number;
}

// ✅ Proceso de análisis
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

// ✅ Candidato analizado por Heimdall (actualizado)
export interface HeimdallCandidate {
  id: string;                    // id interno del análisis
  job_id: string;                // id del job analizado
  job_title: string;             // título del puesto
  recruiter_id: string | null;
  recruiter_name: string | null;
  skills_grade: number;
  match_grade: number;
  adaptability_grade: number;
  key_points: string;            // HTML
  heimdall: "APLICA FUERTEMENTE" | "APLICA" | "NO APLICA" | string;  // resultado
  created_at: string;            // ISO date
  updated_at: string;            // ISO date
}

// ✅ Filtros de análisis (sin cambios)
export interface HeimdallFilters {
  candidate_name: string;
  order_by: string;
}

// ✅ Paginación de resultados (sin cambios)
export interface HeimdallPagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page: number;
  has_next: "true" | "false" | null;
  has_previous: "true" | "false" | null;
}
