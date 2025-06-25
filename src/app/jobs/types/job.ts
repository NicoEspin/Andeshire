export interface Job {
  id: string
  title: string
  location: string
  modality: string
  description: string
  company: {
    id: string
    name: string
  }
  technical_requirements: {
    technologies: Record<string, { years: number; months: number }>
  }
  created_at: string
  updated_at: string
}
