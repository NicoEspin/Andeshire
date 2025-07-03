// src/app/jobs/[id]/types/JobScoreboardsTypes.ts

/** ✅ Entrada individual de un scoreboard */
export interface ScoreboardEntry {
  id: string;
  field_id: string;
  field_name: string;
  field_type: string; // Ej: text, number, checkbox, etc.
  description: string;
  value: string | null;
  updated_at: string;
}

/** ✅ Respuesta individual (si ya tienes estructura definida, cámbiala) */
export interface ScoreboardResponse {
  id: string;
  respondent_name: string | null;
  submitted_at: string;
  answers: Record<string, string | null>; // Ej: { "field_id": "value" }
}
export interface CandidateScoreboardsResponse {
  candidate_id: string;
  candidate_name: string;
  scoreboards: CandidateScoreboard[];
  available_templates: AvailableTemplate[];
}

export interface CandidateScoreboardsResponse {
  candidate_id: string;
  candidate_name: string;
  scoreboards: CandidateScoreboard[];
  available_templates: AvailableTemplate[];
}
/** ✅ Scoreboard principal asociado a un Job */
export interface Scoreboard {
  id: string;
  template_id: string;
  template_name: string;
  recruiter_name: string;
  public: boolean | null;
  public_url: string | null;
  to_complete: boolean | null;
  created_at: string;
  updated_at: string;
  entries: ScoreboardEntry[];
  responses: ScoreboardResponse[]; // Usa la estructura tipada en lugar de `any[]`
}

export interface CandidateScoreboard {
  id: string;
  template_id: string;
  template_name: string;
  recruiter_name: string;
  public: boolean | null;
  public_url: string | null;
  public_shares: PublicShare[];
  to_complete: boolean | null;
  created_at: string;
  updated_at: string;
  entries: ScoreboardEntry[];
  responses: any[];
}
export interface PublicShare {
  id: string;
  public_url: string;
  created_at: string;
}
/** ✅ Detalle de un Scoreboard específico */
export interface ScoreboardDetail {
  id: string;
  template: {
    id: string;
    name: string;
    description: string;
  };
  public: boolean | null;
  public_link: string | null; // Si usas public_url solo, puedes quitar este
  public_url: string | null;
  by_admin: boolean | null; // Usa boolean si es un flag
  to_complete: boolean | null;
  created_at: string;
  updated_at: string;
  entries: ScoreboardEntry[];
  responses: ScoreboardResponse[];
}

/** ✅ Template disponible para crear nuevos Scoreboards */
export interface AvailableTemplate {
  id: string;
  name: string;
}

/** ✅ Respuesta de la API de Job Scoreboards */
export interface JobScoreboardsResponse {
  job_id: string;
  job_name: string;
  scoreboards: Scoreboard[];
  available_templates: AvailableTemplate[];
}
