"use client"

import { useState, useEffect } from "react"
import { ATSJobView } from "./components/ats-job-view"
import { mockJobResponse, mockJobPipeline } from "./data/mock-ats-data"
import type { JobResponse, JobPipeline } from "./types/ats"

export default function ATSJobPage() {
  const [job, setJob] = useState<JobResponse | null>(null)
  const [pipeline, setPipeline] = useState<JobPipeline | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setJob(mockJobResponse)
        setPipeline(mockJobPipeline)
      } catch (err) {
        setError("Error al cargar los datos del trabajo")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (!job || !pipeline) {
    return (
      <ATSJobView job={mockJobResponse} pipeline={mockJobPipeline} isLoading={isLoading} error={error || undefined} />
    )
  }

  return <ATSJobView job={job} pipeline={pipeline} isLoading={isLoading} error={error || undefined} />
}
