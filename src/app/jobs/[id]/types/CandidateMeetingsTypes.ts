// ✅ Participante de la reunión
export interface MeetingParticipant {
  email: string;
}

// ✅ Reunión individual
export interface CandidateMeeting {
  id: string;
  summary: string;
  description: string;
  start_time: string; // ISO date-time string
  end_time: string;   // ISO date-time string
  link: string;       // Enlace a Google Meet o similar
  participants: MeetingParticipant[];
  created_at: string; // ISO date-time string
}

// ✅ Respuesta completa de la API
export interface CandidateMeetingsResponse {
  status: "success" | "error"; // o usa un string literal union si pueden venir otros estados
  candidate_id: string;
  meetings: CandidateMeeting[];
}
