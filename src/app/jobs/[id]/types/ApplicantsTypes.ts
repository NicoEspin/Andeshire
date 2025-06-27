// Respuesta general de la API
export interface ApplicantsApiResponse {
  job_id: string;
  job_title: string;
  total_applicants: number;
  pagination: ApplicantsPagination;
  applicants: Applicant[];
}

// Información de paginación
export interface ApplicantsPagination {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
  has_next: "true" | "false";
  has_previous: "true" | "false";
  next_page: string | null;
  previous_page: string | null;
}

// Representación de un aplicante individual
export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  match_grade: number;
  adaptibility_grade: number;
  skills_grade: number;
  average_grade: number;
  key_points: string; // HTML en string
  source: string | null;
  status: "submitted" | string;
  candidate: string;
  already_ats: "true" | "false";
  applied_at: string;
  cv_url: string;
  technical_resume: string; // JSON string (hay que parsear)
  comparison: string | null;
  applicant_user: string | null;
  applicant_profile: string | null;
  custom_field_answers: any[];
}

// Representación parseada de technical_resume
export interface ParsedTechnicalResume {
  [technology: string]: {
    years: number;
    months: number;
  };
}

// Función para parsear el string del technical_resume
export const parseTechnicalResume = (
  resumeString: string
): ParsedTechnicalResume | null => {
  try {
    const cleaned = resumeString
      .replace(/^```json<br>/, "")
      .replace(/<br>```$/, "")
      .replace(/<br>/g, "")
      .replace(/\\u003C.*?\\u003E/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Error parsing technical_resume:", e);
    return null;
  }
};
