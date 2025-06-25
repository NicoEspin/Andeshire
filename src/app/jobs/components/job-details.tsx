"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Share2, ExternalLink, FileText } from "lucide-react"
import type { JobResponse } from "../types/ats"
import { Badge } from "@/app/components/ui/badge"

interface JobDetailsProps {
  job: JobResponse
}

export function JobDetails({ job }: JobDetailsProps) {
  const handleShare = () => {
    console.log("Compartir trabajo:", job.id)
  }

  const handleViewPublic = () => {
    console.log("Ver página pública:", job.id)
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-gray-900 min-w-0 flex-1">Detalles del Puesto</CardTitle>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
            <Button variant="outline" size="sm" onClick={handleViewPublic}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver público
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-fit space-y-6 max-w-full pr-4">
          <div className="space-y-6 max-w-full">
            {/* Row 1: Responsabilidades principales + Requisitos técnicos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-0 slide-in-from-left-4 duration-500">
              {/* Left: Responsabilidades principales */}
              <div className="group">
                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2 transition-colors duration-300 group-hover:text-blue-900">
                  <FileText className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Responsabilidades principales
                </h3>
                <div className="prose prose-xs max-w-none text-gray-700 text-sm space-y-1">
                  {job.description.split("\n").map((paragraph, index) => {
                    if (paragraph.includes("Responsabilidades principales:")) {
                      return null // Skip the header
                    }
                    if (paragraph.startsWith("•") && index < 10) {
                      // Only show first responsibilities
                      return (
                        <li key={index} className="ml-3 mb-1 text-sm">
                          {paragraph.substring(2)}
                        </li>
                      )
                    }
                    if (paragraph.includes("Requisitos técnicos:")) {
                      return null // Stop at technical requirements
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Right: Requisitos técnicos */}
              <div className="group">
                {job.requirements && job.requirements.length > 0 && (
                  <>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-900">
                      Requisitos Técnicos
                    </h3>
                    <ul className="space-y-1">
                      {job.requirements?.map((requirement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 transition-all duration-300 hover:translate-x-1 hover:text-gray-900 animate-in fade-in-0 slide-in-from-right-2"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0 transition-all duration-300 hover:bg-blue-600 hover:scale-125" />
                          <span className="text-gray-700 text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Row 2: Lo que ofrecemos + Experiencia requerida */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-0 slide-in-from-right-4 duration-500 delay-200">
              {/* Left: Lo que ofrecemos */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Lo que ofrecemos</h3>
                <div className="prose prose-xs max-w-none text-gray-700 text-sm">
                  {job.description.split("\n").map((paragraph, index) => {
                    if (paragraph.includes("Lo que ofrecemos:")) {
                      return null // Skip the header
                    }
                    if (
                      paragraph.startsWith("•") &&
                      paragraph.includes("remoto" || "equipo" || "certificación" || "ambiente")
                    ) {
                      return (
                        <li key={index} className="ml-3 mb-1 text-sm">
                          {paragraph.substring(2)}
                        </li>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Right: Experiencia requerida */}
              <div>
                {job.id === "2c5ccf48-c318-407c-8ab7-81db931a6fea" && (
                  <>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Experiencia Requerida</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-sm hover:scale-105">
                        <span className="font-medium text-gray-900 text-sm">Cloud Computing</span>
                        <Badge variant="secondary" className="text-xs transition-all duration-300 hover:scale-110">
                          5 años
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100 hover:shadow-sm hover:scale-105">
                        <span className="font-medium text-gray-900 text-sm">FinOps</span>
                        <Badge variant="secondary" className="text-xs transition-all duration-300 hover:scale-110">
                          4 años
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100 hover:shadow-sm hover:scale-105">
                        <span className="font-medium text-gray-900 text-sm">Python</span>
                        <Badge variant="secondary" className="text-xs transition-all duration-300 hover:scale-110">
                          3 años
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Información Adicional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Categoría:</span>
                  <span className="text-gray-600">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Modalidad:</span>
                  <span className="text-gray-600">{job.modality}</span>
                </div>
                {job.english_level && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Nivel de inglés:</span>
                    <span className="text-gray-600">{job.english_level}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Ubicación:</span>
                  <span className="text-gray-600">{job.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
