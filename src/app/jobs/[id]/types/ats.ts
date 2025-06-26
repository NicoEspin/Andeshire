export interface JobResponse {
  id: string
  title: string
  company: {
    id: string
    name: string
    logo?: string
  }
  location: string
  modality: "Remoto" | "Presencial" | "Híbrido"
  english_level?: string
  category: string
  perks?: string[]
  salary_range?: {
    min: number
    max: number
    currency: string
  }
  description: string
  requirements?: string[]
  created_at: string
  updated_at: string
  status: "active" | "paused" | "closed"
}

export interface Candidate {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  location?: string
  experience_years?: number
  current_stage: string
  applied_at: string
  last_activity?: string
  score?: number
  notes?: string
}

export interface Stage {
  id: string
  name: string
  order: number
  color: string
  candidates: Candidate[]
}

export interface JobPipeline {
  job_id: string
  stages: Stage[]
  total_candidates: number
}
