"use client"
import { useState } from "react"
import { BreadcrumbNav } from "./breadcrumb-nav"
import { JobHeader } from "./job-header"
import { CandidatesTable } from "./candidates-table"
import { ApplicantsTable } from "./applicants-table"
import type { JobResponse, JobPipeline as JobPipelineType } from "../types/ats"
import { KanbanView } from "./kanban-view"
import { JobDescriptionView } from "./job-description-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Checkbox } from "@/app/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Search, Download, MoreHorizontal, Mail, Phone, ExternalLink, EyeOff, Settings, Shield } from "lucide-react"

interface ATSJobViewProps {
  job: JobResponse
  pipeline: JobPipelineType
  isLoading?: boolean
  error?: string
}

export function ATSJobView({ job, pipeline, isLoading = false, error }: ATSJobViewProps) {
  const [activeTab, setActiveTab] = useState("detalles")
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table")
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "candidatos":
        return viewMode === "kanban" ? (
          <KanbanView />
        ) : (
          <CandidatesTable viewMode={viewMode} onViewModeChange={setViewMode} />
        )
      case "aplicantes":
        return <ApplicantsTable />
      case "heimdall":
        return (
          <Card className="h-full overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Heimdall - Análisis de Candidatos
                </CardTitle>
                <div className="flex items-center gap-3">
                  {selectedCandidates.length > 0 && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Vincular candidatos ({selectedCandidates.length})
                    </Button>
                  )}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Buscar candidatos..." className="pl-10 w-64" />
                  </div>

                  <Select defaultValue="best-match">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best-match">Mejor match</SelectItem>
                      <SelectItem value="oldest">Más antiguos</SelectItem>
                      <SelectItem value="newest">Más recientes</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <EyeOff className="h-4 w-4 mr-2" />
                    Ver candidatos ocultos
                  </Button>

                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Ajustes
                  </Button>

                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        S
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        LinkedIn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Localización
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Teléfono
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Puesto Actual
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Heimdall
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Comparación
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        id: "1",
                        name: "Carlos Rodríguez",
                        linkedin: "https://linkedin.com/in/carlos-rodriguez",
                        location: "Buenos Aires, Argentina",
                        email: "carlos.rodriguez@email.com",
                        phone: "+54 11 1234-5678",
                        currentPosition: "Senior Cloud Engineer",
                        heimdallScore: 94,
                        comparison: "Excelente match",
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        id: "2",
                        name: "María González",
                        linkedin: "https://linkedin.com/in/maria-gonzalez",
                        location: "Córdoba, Argentina",
                        email: "maria.gonzalez@email.com",
                        phone: "+54 351 987-6543",
                        currentPosition: "DevOps Engineer",
                        heimdallScore: 88,
                        comparison: "Muy buen match",
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        id: "3",
                        name: "Diego Fernández",
                        linkedin: "https://linkedin.com/in/diego-fernandez",
                        location: "Rosario, Argentina",
                        email: "diego.fernandez@email.com",
                        phone: "+54 341 555-0123",
                        currentPosition: "Infrastructure Specialist",
                        heimdallScore: 82,
                        comparison: "Buen match",
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        id: "4",
                        name: "Ana Morales",
                        linkedin: "https://linkedin.com/in/ana-morales",
                        location: "Mendoza, Argentina",
                        email: "ana.morales@email.com",
                        phone: "+54 261 444-7890",
                        currentPosition: "Cloud Architect",
                        heimdallScore: 91,
                        comparison: "Excelente match",
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        id: "5",
                        name: "Roberto Silva",
                        linkedin: "https://linkedin.com/in/roberto-silva",
                        location: "La Plata, Argentina",
                        email: "roberto.silva@email.com",
                        phone: "+54 221 333-4567",
                        currentPosition: "FinOps Engineer",
                        heimdallScore: 96,
                        comparison: "Match perfecto",
                        avatar: "/placeholder.svg?height=32&width=32",
                      },
                    ].map((candidate, index) => (
                      <tr
                        key={candidate.id}
                        className="hover:bg-gray-50 transition-colors duration-150 animate-in fade-in-0 slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4">
                          <Checkbox
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={() => handleSelectCandidate(candidate.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{candidate.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-blue-600 hover:text-blue-800"
                            onClick={() => window.open(candidate.linkedin, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{candidate.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{candidate.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{candidate.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.currentPosition}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                              candidate.heimdallScore >= 90
                                ? "text-green-600 bg-green-50"
                                : candidate.heimdallScore >= 80
                                  ? "text-blue-600 bg-blue-50"
                                  : candidate.heimdallScore >= 70
                                    ? "text-yellow-600 bg-yellow-50"
                                    : "text-red-600 bg-red-50"
                            }`}
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {candidate.heimdallScore}%
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={`text-xs font-medium ${
                              candidate.comparison === "Match perfecto" || candidate.comparison === "Excelente match"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : candidate.comparison === "Muy buen match"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : candidate.comparison === "Buen match"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {candidate.comparison}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                                <DropdownMenuItem>Ver análisis Heimdall</DropdownMenuItem>
                                <DropdownMenuItem>Agregar a candidatos</DropdownMenuItem>
                                <DropdownMenuItem>Programar entrevista</DropdownMenuItem>
                                <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                                <DropdownMenuItem>Ocultar candidato</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Descartar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Results info */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">Mostrando 5 candidatos</div>
              </div>
            </CardContent>
          </Card>
        )
      case "descripcion":
        return <JobDescriptionView job={job} />
      case "detalles":
      default:
        return (
          <div className="space-y-8">
            {/* General Information Section */}
            <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Información general</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Fecha de apertura:</span>
                      <span className="text-sm text-gray-900">
                        {new Date(job.created_at).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Período de aplicación:</span>
                      <span className="text-sm text-gray-900">
                        {Math.ceil((new Date().getTime() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24))}{" "}
                        días
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Candidatos vinculados:</span>
                      <span className="text-sm text-gray-900">{pipeline.total_candidates}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Estado:</span>
                      <Badge
                        className={
                          job.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {job.status === "active" ? "Abierta" : "Cerrada"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Publicación en portal:</span>
                      <Badge className="bg-green-100 text-green-800">Abierta</Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Enlaces públicos:</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Ver enlace público
                        </Button>
                        <Button variant="outline" size="sm">
                          Copiar enlace
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Workflow:</span>
                      <span className="text-sm text-gray-900">Talent Acquisitions Staffing Workflow</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Criteria Section */}
            <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Criterios de validación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Tecnologías requeridas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-900">Cloud</span>
                      <Badge variant="secondary">5 años</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-gray-900">FinOps</span>
                      <Badge variant="secondary">4 años</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-900">Python</span>
                      <Badge variant="secondary">3 años</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Nivel de inglés</h4>
                    <Badge className="bg-blue-100 text-blue-800">{job.english_level || "C1"}</Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Modalidad de trabajo</h4>
                    <Badge className="bg-green-100 text-green-800">{job.modality}</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Búsqueda</h4>
                  <Button variant="outline" size="sm">
                    Candidatos similares
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Section */}
            <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Dashboard de la vacante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Progreso de candidatos en el workflow</h4>
                  <div className="space-y-3">
                    {pipeline.stages.map((stage) => {
                      const percentage =
                        pipeline.total_candidates > 0
                          ? Math.round((stage.candidates.length / pipeline.total_candidates) * 100)
                          : 0
                      return (
                        <div key={stage.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-900">{stage.candidates.length}</span>
                            <span className="text-sm text-gray-600">{percentage}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Files Section */}
            <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Archivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Button variant="outline" className="mb-4">
                    Agregar Archivo
                  </Button>
                  <p className="text-sm text-gray-600">No hay archivos disponibles.</p>
                </div>
              </CardContent>
            </Card>

            {/* Forms Section */}
            <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-600">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Formularios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Button variant="outline" className="mb-4">
                    Crear Nuevo
                  </Button>
                  <p className="text-sm text-gray-600">No hay formularios disponibles para este trabajo.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <BreadcrumbNav jobTitle={job.title} />
      </div>

      {/* Job Header */}
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700 delay-100">
        <JobHeader job={job} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 overflow-hidden">
        {activeTab === "heimdall" && (
          <div className="mb-6 space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Candidatos sugeridos</h1>
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Reiniciar análisis
              </Button>
            </div>

            {/* Analysis Status Card */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-1">Análisis completado</h3>
                    <p className="text-sm text-green-800 mb-2">Se han analizado todos los candidatos.</p>
                    <p className="text-xs text-green-700">Completado: 23 jun 2025, 12:48</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  )
}
