"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Eye, MapPin, Calendar, Building2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { mockJobs } from "../data/mock-jobs"

const ITEMS_PER_PAGE = 5

export default function JobDescriptionsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [modalityFilter, setModalityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesModality = modalityFilter === "all" || job.modality === modalityFilter
      return matchesSearch && matchesModality
    })
  }, [searchTerm, modalityFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get modality badge color
  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "Remoto":
        return "bg-green-100 text-green-800 border-green-200"
      case "Híbrido":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Presencial":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleViewDetails = (jobId: string) => {
    console.log("Ver detalles del trabajo:", jobId)
    // Aquí iría la lógica para mostrar detalles o navegar
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Job Descriptions</h1>
        <p className="text-gray-600">Encuentra tu próxima oportunidad profesional</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por título o empresa..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-4 w-4" />
          <Select
            value={modalityFilter}
            onValueChange={(value) => {
              setModalityFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-40 border-gray-300">
              <SelectValue placeholder="Modalidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
              <SelectItem value="Híbrido">Híbrido</SelectItem>
              <SelectItem value="Presencial">Presencial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Puesto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Modalidad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 line-clamp-2">{job.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{job.company.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{job.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${getModalityColor(job.modality)} font-medium`}>{job.modality}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{formatDate(job.created_at)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(job.id)}
                      className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {paginatedJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{job.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 font-medium">{job.company.name}</span>
                    </div>
                  </div>
                  <Badge className={`${getModalityColor(job.modality)} font-medium shrink-0`}>{job.modality}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(job.created_at)}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(job.id)}
                  className="w-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="hover:bg-gray-50"
          >
            Anterior
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 p-0 ${currentPage === page ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-50"}`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="hover:bg-gray-50"
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Results info */}
      <div className="text-center text-sm text-gray-600">
        Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} de {filteredJobs.length}{" "}
        trabajos
      </div>
    </div>
  )
}
