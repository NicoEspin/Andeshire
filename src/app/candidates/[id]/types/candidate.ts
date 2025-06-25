export interface CandidateFile {
  id: string
  filename: string
  description: string
  uploaded_at: string
  url: string
}

export interface CVDocument {
  filename: string
  upload_date: string
  file_size: string
  url: string
}

export interface ScoreboardEntry {
  field_name: string
  field_type: string
  value: string | null
}

export interface Scoreboard {
  id: string
  template_name: string
  recruiter_name: string
  to_complete: boolean
  created_at: string
  entries: ScoreboardEntry[]
}

export interface Candidate {
  id: number
  candidate_name: string
  candidate_email: string
  candidate_phone: string
  position: string
  cv_document: CVDocument | null
  files: CandidateFile[]
  scoreboards: Scoreboard[]
  has_category: boolean
}
