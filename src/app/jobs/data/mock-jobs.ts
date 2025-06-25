import type { Job } from "../types/job"

export const mockJobs: Job[] = [
  {
    id: "2c5ccf48-c318-407c-8ab7-81db931a6fea",
    title: "Site Reliability Engineer Cloud and Infrastructure",
    location: "Argentina",
    modality: "Remoto",
    description: "The Senior FinOps Engineer will play a key role in advancing our cloud cost management...",
    company: { id: "96482fd8-3955-492a-bd3f-0747991fb226", name: "Unosquare" },
    technical_requirements: {
      technologies: {
        cloud: { years: 5, months: 0 },
        finops: { years: 4, months: 0 },
        python: { years: 3, months: 0 },
      },
    },
    created_at: "2025-06-17T14:49:29.347580+00:00",
    updated_at: "2025-06-17T14:49:46.232510+00:00",
  },
  {
    id: "5a2cfb9e-c1e4-4df4-a0a4-e733e86c1c99",
    title: "Cloud DevOps Engineer",
    location: "México",
    modality: "Híbrido",
    description: "Responsible for CI/CD pipelines, cloud infrastructure automation and monitoring systems.",
    company: { id: "2930dfc1-dc2e-47df-98f6-6b703e1bcf50", name: "Globant" },
    technical_requirements: {
      technologies: {
        aws: { years: 4, months: 6 },
        docker: { years: 3, months: 2 },
        terraform: { years: 2, months: 8 },
      },
    },
    created_at: "2025-06-16T10:15:00.000Z",
    updated_at: "2025-06-16T12:00:00.000Z",
  },
  {
    id: "d67fbe45-831f-42c4-93ab-b620331b2c51",
    title: "Backend Developer - Python",
    location: "Colombia",
    modality: "Remoto",
    description: "Join our team to build scalable backend systems using Python and FastAPI.",
    company: { id: "7d8a0d5b-f7aa-4c48-a423-1d4db215bc8b", name: "Mercado Libre" },
    technical_requirements: {
      technologies: {
        python: { years: 4, months: 0 },
        fastapi: { years: 2, months: 6 },
        postgresql: { years: 3, months: 0 },
      },
    },
    created_at: "2025-06-15T08:00:00.000Z",
    updated_at: "2025-06-15T11:30:00.000Z",
  },
  {
    id: "73c0f285-e449-4c75-bf9e-ec9d8788a013",
    title: "Data Engineer",
    location: "Chile",
    modality: "Presencial",
    description: "Design data pipelines and processing systems using Spark and Python.",
    company: { id: "94cfe3f4-f98b-4b25-bd04-5187d8dd1e77", name: "ThoughtWorks" },
    technical_requirements: {
      technologies: {
        spark: { years: 3, months: 0 },
        python: { years: 4, months: 3 },
        airflow: { years: 2, months: 1 },
      },
    },
    created_at: "2025-06-14T13:20:00.000Z",
    updated_at: "2025-06-14T15:45:00.000Z",
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Frontend Developer - React",
    location: "Perú",
    modality: "Híbrido",
    description: "Build modern web applications using React, TypeScript, and Next.js.",
    company: { id: "12345678-abcd-efgh-ijkl-mnopqrstuvwx", name: "Rappi" },
    technical_requirements: {
      technologies: {
        react: { years: 3, months: 6 },
        typescript: { years: 2, months: 9 },
        nextjs: { years: 2, months: 0 },
      },
    },
    created_at: "2025-06-13T09:30:00.000Z",
    updated_at: "2025-06-13T14:15:00.000Z",
  },
  {
    id: "f9e8d7c6-b5a4-9382-7160-5948372615a0",
    title: "Mobile Developer - Flutter",
    location: "Brasil",
    modality: "Remoto",
    description: "Develop cross-platform mobile applications using Flutter and Dart.",
    company: { id: "87654321-zyxw-vutr-qpon-mlkjihgfedcb", name: "iFood" },
    technical_requirements: {
      technologies: {
        flutter: { years: 2, months: 8 },
        dart: { years: 2, months: 6 },
        firebase: { years: 1, months: 10 },
      },
    },
    created_at: "2025-06-12T16:45:00.000Z",
    updated_at: "2025-06-12T18:20:00.000Z",
  },
]
