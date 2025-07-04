// Experiencia de cada tecnología en el campo parseado del technical_resume
export interface TechnologyExperience {
  years: number;
  months: number;
}

// Versión parseada del campo technical_resume
export type ParsedTechnicalResume = Record<string, TechnologyExperience>;

// Tag individual asociado a un candidato
export interface CandidateTag {
  id: string;
  name: string;
  description?: string; // Opcional porque a veces viene null o no existe
}

// Reclutador individual (lo devuelves en filters)
export interface FilterRecruiter {
  id: string;
  name: string;
}

// Tag individual para filters
export interface FilterTag {
  id: string;
  name: string;
}

// Un candidato individual
export interface Candidate {
  id: string;
  name: string;
  email: string;
  category: string | null;
  recruiter_name: string | null;
  technical_resume: string | null; // El raw string con el JSON embebido y marcado
  phone_number: string | null;
  current_job_title: string | null;
  location: string | null;
  linkedin: string | null;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  tech: string | null; // Por si tuvieras un campo tech directo
  tags: CandidateTag[]; // Array de tags
  country: string | null;
  state_province: string | null;
  city: string | null;
  latest_update_linkedin: string | null;
}

// Información de paginación
export interface Pagination {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Filtros devueltos por tu API
export interface Filters {
  categories: string[];  // ["Backend", "Devops", ...] puede tener repetidos
  companies: string[];   // ["Globant", "StartUp XYZ", ...]
  tags: FilterTag[];
  countries: string[];
  cities: string[];
  state_provinces: string[];
  recruiters: FilterRecruiter[];
}

// Campo meta para datos extra
export interface CandidatesMeta {
  duplicated_candidates: any | null; // Puede ser null
}

// Respuesta principal del fetch de candidatos
export interface CandidatesFetchResponse {
  candidates: Candidate[];
  pagination: Pagination;
  filters: Filters;
  meta: CandidatesMeta;
}
