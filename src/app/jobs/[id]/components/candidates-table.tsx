"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Search, Download, MoreHorizontal, Mail, Phone, Table, Kanban } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { KanbanView } from "./kanban-view"
import { useState } from "react"

// Mock data para la tabla
const mockCandidates = [
  {
    id: "1",
    name: "Pedro Vassena",
    email: "pedro.vassena@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    stage: "Vinculado Manualmente sin acciones",
    applicationDate: "2025-01-15",
    match: 85,
    compensation: "$80,000 - $100,000",
    otherProcesses: "Activo en 2 procesos",
  },
  {
    id: "2",
    name: "Sebastian Lionel Meglio",
    email: "sebastian.meglio@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    stage: "Vinculado Manualmente sin acciones",
    applicationDate: "2025-01-14",
    match: 92,
    compensation: "$90,000 - $110,000",
    otherProcesses: "Sin otros procesos",
  },
  {
    id: "3",
    name: "Agustin Rufino",
    email: "agustin.rufino@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    stage: "Vinculado Manualmente sin acciones",
    applicationDate: "2025-01-13",
    match: 78,
    compensation: "$75,000 - $95,000",
    otherProcesses: "Activo en 1 proceso",
  },
  {
    id: "4",
    name: "Federico Barabasch",
    email: "federico.barabasch@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    stage: "Rejected by recruiter",
    applicationDate: "2025-01-12",
    match: 65,
    compensation: "$70,000 - $85,000",
    otherProcesses: "Sin otros procesos",
  },
]

interface CandidatesTableProps {
  viewMode: "table" | "kanban"
  onViewModeChange: (mode: "table" | "kanban") => void
}

export function CandidatesTable({ viewMode, onViewModeChange }: CandidatesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")

  const getMatchColor = (match: number) => {
    if (match >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (match >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getStageColor = (stage: string) => {
    if (stage.includes("Rejected")) return "bg-red-100 text-red-800 border-red-200"
    if (stage.includes("Portal")) return "bg-green-100 text-green-800 border-green-200"
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <div className="h-full overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Header - Always visible */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Candidatos</h2>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("table")}
                className="h-8 px-3"
              >
                <Table className="h-4 w-4 mr-1" />
                Tabla
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("kanban")}
                className="h-8 px-3"
              >
                <Kanban className="h-4 w-4 mr-1" />
                Kanban
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar candidatos..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las etapas</SelectItem>
                <SelectItem value="manual">Vinculado Manualmente</SelectItem>
                <SelectItem value="portal">Desde Portal</SelectItem>
                <SelectItem value="whatsapp">Mensaje Whatsapp</SelectItem>
                <SelectItem value="interview-gen">Agente generador</SelectItem>
                <SelectItem value="pending-screening">Pending Screening</SelectItem>
                <SelectItem value="screened">Screened</SelectItem>
                <SelectItem value="presented">Presentado Partner</SelectItem>
                <SelectItem value="tech-scheduled">Tech Interview</SelectItem>
                <SelectItem value="tech-approved">Tech Aprobado</SelectItem>
                <SelectItem value="final-interview">Final Interview</SelectItem>
                <SelectItem value="offer-discussion">Offer Discussion</SelectItem>
                <SelectItem value="hire">Hire</SelectItem>
                <SelectItem value="rejected">Rechazados</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => console.log("Exportar candidatos")}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        {viewMode === "kanban" ? (
          <div className="h-full">
            <KanbanView searchTerm={searchTerm} stageFilter={stageFilter} />
          </div>
        ) : (
          <Card className="h-full m-6 mt-0">
            <CardContent className="pt-6 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Etapa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Fecha de aplicación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Match
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Compensación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado en otros procesos
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockCandidates.map((candidate, index) => (
                      <tr
                        key={candidate.id}
                        className="hover:bg-gray-50 transition-colors duration-150 animate-in fade-in-0 slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
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
                          <div className="text-sm text-gray-600">{candidate.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${getStageColor(candidate.stage)} text-xs font-medium`}>
                            {candidate.stage}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(candidate.applicationDate).toLocaleDateString("es-ES")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${getMatchColor(candidate.match)} text-xs font-medium`}>
                            {candidate.match}% match
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{candidate.compensation}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{candidate.otherProcesses}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                                <DropdownMenuItem>Cambiar etapa</DropdownMenuItem>
                                <DropdownMenuItem>Programar entrevista</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Rechazar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
