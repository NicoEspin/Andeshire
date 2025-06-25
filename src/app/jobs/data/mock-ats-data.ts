import type { JobResponse, JobPipeline, Candidate } from "../types/ats"

// Convert the new mock data to match our existing types
export const mockJobResponse: JobResponse = {
  id: "2c5ccf48-c318-407c-8ab7-81db931a6fea",
  title: "Site Reliability Engineer Cloud and Infrastructure",
  company: {
    id: "96482fd8-3955-492a-bd3f-0747991fb226",
    name: "Unosquare",
    logo: "/placeholder.svg?height=40&width=40",
  },
  location: "Argentina",
  modality: "Remoto",
  english_level: "C1 (Advanced)",
  category: "Tecnología",
  perks: ["FinOps", "Cloud", "Python", "AWS", "GCP", "Azure"],
  salary_range: undefined, // No salary range provided in mock
  description: `The Senior FinOps Engineer will play a key role in advancing our cloud cost management and optimization strategies.

**Responsabilidades principales:**
• Implementar y mantener prácticas de FinOps en toda la organización
• Desarrollar dashboards y reportes de costos de cloud computing
• Colaborar con equipos de ingeniería para optimizar el uso de recursos
• Automatizar procesos de monitoreo y alertas de costos

**Requisitos técnicos:**
• 5+ años de experiencia en cloud computing (AWS, GCP, Azure)
• 4+ años de experiencia en FinOps y gestión de costos
• 3+ años de experiencia con Python para automatización
• Conocimiento profundo de herramientas de FinOps
• Experiencia con Infrastructure as Code (Terraform, CloudFormation)

**Lo que ofrecemos:**
• Trabajo 100% remoto
• Equipo internacional y diverso
• Oportunidades de certificación en cloud
• Ambiente de aprendizaje continuo`,
  requirements: [
    "5+ años de experiencia en cloud computing",
    "4+ años de experiencia en FinOps",
    "3+ años de experiencia con Python",
    "Conocimiento de AWS, GCP, Azure",
    "Experiencia con Infrastructure as Code",
  ],
  created_at: "2025-06-17T14:49:29.347Z",
  updated_at: "2025-06-17T14:49:46.232Z",
  status: "active",
}

// Create detailed candidate data based on the provided names
const createCandidateFromName = (id: string, name: string, stage: string): Candidate => {
  const [firstName, ...lastNames] = name.split(" ")
  const lastName = lastNames.join(" ")

  return {
    id,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s+/g, "")}@email.com`,
    avatar: "/placeholder.svg?height=32&width=32",
    phone: `+54 11 ${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
    location: "Argentina",
    experience_years: Math.floor(Math.random() * 8) + 3,
    current_stage: stage,
    applied_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    last_activity: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
    score: Math.floor(Math.random() * 40) + 60,
    notes: `Candidato con experiencia en ${stage === "rejected" ? "tecnologías no alineadas" : "cloud computing y FinOps"}`,
  }
}

export const mockJobPipeline: JobPipeline = {
  job_id: "2c5ccf48-c318-407c-8ab7-81db931a6fea",
  stages: [
    {
      id: "c5691965-5f91-4a5f-83fc-eca8150ce2b4",
      name: "Vinculado Manualmente sin acciones",
      order: 1,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      candidates: [
        createCandidateFromName("60bdd9d7-3707-4d68-83d9-f2a0efc318a9", "Pedro Vassena", "manual"),
        createCandidateFromName("24023fd5-6b83-40dc-9a13-79ae3dc86c67", "Sebastian Lionel Meglio", "manual"),
        createCandidateFromName("4ee1edb5-23c3-499d-b494-6ea6f54b5d36", "Agustin Rufino", "manual"),
      ],
    },
    {
      id: "fa7f283c-8f71-4a13-b360-ddabc53814c5",
      name: "Candidato desde el Portal",
      order: 2,
      color: "bg-green-100 text-green-800 border-green-200",
      candidates: [],
    },
    {
      id: "8621760a-acbb-4cd8-b707-6dbbde4343e8",
      name: "Rejected by recruiter",
      order: 3,
      color: "bg-red-100 text-red-800 border-red-200",
      candidates: [createCandidateFromName("f9833939-d499-4c36-a011-fe527a794ee5", "Federico Barabasch", "rejected")],
    },
  ],
  total_candidates: 4,
}
