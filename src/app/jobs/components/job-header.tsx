"use client"

import {
  Building2,
  MapPin,
  Globe,
  GraduationCap,
  Tag,
  DollarSign,
  FileText,
  Users,
  Shield,
  UserCheck,
} from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import type { JobResponse } from "../types/ats"
import JobTitleDisplay from "./JobDetail"
import JobDetail from "./JobDetail"

interface JobHeaderProps {
  job: JobResponse
  activeTab: string
  onTabChange: (tab: string) => void
}

export function JobHeader({ job, activeTab, onTabChange }: JobHeaderProps) {
  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case "Remoto":
        return <Globe className="h-4 w-4" />
      case "Presencial":
        return <Building2 className="h-4 w-4" />
      case "Híbrido":
        return <MapPin className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case "Remoto":
        return "bg-green-100 text-green-800 border-green-200"
      case "Presencial":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Híbrido":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`
  }

  const menuItems = [
    { id: "detalles", label: "Detalles", icon: FileText },
    { id: "descripcion", label: "Descripción", icon: FileText },
    { id: "candidatos", label: "Candidatos", icon: Users },
    { id: "heimdall", label: "Heimdall", icon: Shield },
    { id: "aplicantes", label: "Aplicantes", icon: UserCheck },
  ]

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left side - Job info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-4 group">
              <Avatar className="h-12 w-12 border-2 border-gray-100 transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md">
                <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold transition-colors duration-300 group-hover:bg-blue-200">
                  {job.company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-blue-900">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-lg text-gray-600 mb-3 transition-colors duration-300 hover:text-gray-800">
                  <Building2 className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                  <span className="font-medium">{job.company.name}</span>
                </div>
              </div>
            </div>

            {/* Job details */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-600 transition-all duration-300 hover:text-gray-800 hover:scale-105">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{job.location}</span>
              </div>

              <Badge
                className={`${getModalityColor(job.modality)} font-medium transition-all duration-300 hover:scale-105 hover:shadow-sm`}
              >
                {getModalityIcon(job.modality)}
                <span className="ml-1">{job.modality}</span>
              </Badge>

              {job.english_level && (
                <div className="flex items-center gap-2 transition-all duration-300 hover:text-gray-800 hover:scale-105">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.english_level}</span>
                </div>
              )}

              <div className="flex items-center gap-2 transition-all duration-300 hover:text-gray-800 hover:scale-105">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{job.category}</span>
              </div>

              {job.salary_range && (
                <div className="flex items-center gap-2 transition-all duration-300 hover:text-gray-800 hover:scale-105">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{formatSalary(job.salary_range)}</span>
                </div>
              )}
            </div>

            {/* Perks or Tags */}
            {job.perks && job.perks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.perks.map((perk, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs transition-all duration-300 hover:scale-105 hover:bg-blue-100 hover:text-blue-800 animate-in fade-in-0 slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {perk}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Status */}
          <div className="flex flex-col items-end gap-3">
            <Badge
              className={`${
                job.status === "active"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              } font-medium`}
            >
              {job.status === "active" ? "Activo" : "Inactivo"}
            </Badge>
            <div className="text-right text-sm text-gray-500">
              <div>Creado: {new Date(job.created_at).toLocaleDateString("es-ES")}</div>
              <div>Actualizado: {new Date(job.updated_at).toLocaleDateString("es-ES")}</div>
            </div>
          </div>
        </div>
        {/* Navigation Menu */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <nav className="flex items-center space-x-8 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      <JobDetail jobId="b1a947d7-ec97-4380-b1de-0416f0f5c3e4" />
    </div>
  )
}
