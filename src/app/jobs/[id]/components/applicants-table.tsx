"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Search, Download, MoreHorizontal, Mail, Phone, Star, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"

// Mock data para la tabla de aplicantes
const mockApplicants = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    scores: {
      technical: 88,
      cultural: 92,
      experience: 85,
      overall: 88,
    },
    status: "En revisión",
    source: "LinkedIn",
    appliedDate: "2025-01-16",
    location: "Buenos Aires, Argentina",
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    scores: {
      technical: 95,
      cultural: 87,
      experience: 90,
      overall: 91,
    },
    status: "Preseleccionado",
    source: "Portal de empleo",
    appliedDate: "2025-01-15",
    location: "Córdoba, Argentina",
  },
  {
    id: "3",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    scores: {
      technical: 82,
      cultural: 89,
      experience: 78,
      overall: 83,
    },
    status: "Nuevo",
    source: "Referido",
    appliedDate: "2025-01-14",
    location: "Rosario, Argentina",
  },
  {
    id: "4",
    name: "Diego Fernández",
    email: "diego.fernandez@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    scores: {
      technical: 76,
      cultural: 84,
      experience: 82,
      overall: 81,
    },
    status: "Descartado",
    source: "Indeed",
    appliedDate: "2025-01-13",
    location: "Mendoza, Argentina",
  },
  {
    id: "5",
    name: "Lucía Morales",
    email: "lucia.morales@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    scores: {
      technical: 91,
      cultural: 88,
      experience: 87,
      overall: 89,
    },
    status: "En entrevista",
    source: "Glassdoor",
    appliedDate: "2025-01-12",
    location: "La Plata, Argentina",
  },
]

export function ApplicantsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nuevo":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "En revisión":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Preseleccionado":
        return "bg-green-100 text-green-800 border-green-200"
      case "En entrevista":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Descartado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case "LinkedIn":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Portal de empleo":
        return "bg-green-100 text-green-800 border-green-200"
      case "Referido":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Indeed":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Glassdoor":
        return "bg-teal-100 text-teal-800 border-teal-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="h-full overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-gray-900">Aplicantes</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar aplicantes..." className="pl-10 w-64" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="nuevo">Nuevo</SelectItem>
                <SelectItem value="revision">En revisión</SelectItem>
                <SelectItem value="preseleccionado">Preseleccionado</SelectItem>
                <SelectItem value="entrevista">En entrevista</SelectItem>
                <SelectItem value="descartado">Descartado</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Fuente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fuentes</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="portal">Portal de empleo</SelectItem>
                <SelectItem value="referido">Referido</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="glassdoor">Glassdoor</SelectItem>
              </SelectContent>
            </Select>
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
                  Aplicante
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Puntajes
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fuente
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockApplicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className="hover:bg-gray-50 transition-colors duration-150 animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{applicant.name}</div>
                        <div className="text-xs text-gray-500">{applicant.email}</div>
                        <div className="text-xs text-gray-400">{applicant.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className={`text-sm font-medium ${getScoreColor(applicant.scores.overall)}`}>
                          {applicant.scores.overall}% General
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div>Técnico: {applicant.scores.technical}%</div>
                        <div>Cultural: {applicant.scores.cultural}%</div>
                        <div>Exp: {applicant.scores.experience}%</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${getStatusColor(applicant.status)} text-xs font-medium`}>
                      {applicant.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${getSourceColor(applicant.source)} text-xs font-medium`}>
                      {applicant.source}
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
                          <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                          <DropdownMenuItem>Mover a candidatos</DropdownMenuItem>
                          <DropdownMenuItem>Programar entrevista</DropdownMenuItem>
                          <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
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
      </CardContent>
    </Card>
  )
}
