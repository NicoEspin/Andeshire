import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent } from "@/app/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { MapPin, Clock, Star, Phone, Mail } from "lucide-react"
import type { Candidate } from "../types/ats"

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d`
  }

  const getScoreColor = (score?: number) => {
    if (!score) return "bg-gray-100 text-gray-600"
    if (score >= 80) return "bg-green-100 text-green-700"
    if (score >= 60) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  return (
    <TooltipProvider>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer w-full group hover:-translate-y-1 hover:border-blue-200 animate-in fade-in-0 slide-in-from-bottom-4">
        <CardContent className="p-4">
          <div className="space-y-3 max-w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 w-full">
              <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                <Avatar className="h-10 w-10 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium transition-colors duration-300 group-hover:bg-blue-200">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 max-w-full overflow-hidden">
                  <h4 className="font-medium text-gray-900 truncate text-sm transition-colors duration-300 group-hover:text-blue-900">
                    {candidate.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate transition-colors duration-300 group-hover:text-gray-600">
                    {candidate.email}
                  </p>
                </div>
              </div>
              {candidate.score && (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      className={`${getScoreColor(candidate.score)} text-xs font-medium flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-sm`}
                    >
                      <Star className="h-3 w-3 mr-1 transition-transform duration-300 hover:rotate-12" />
                      {candidate.score}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Puntuación del candidato</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Details con micro-animaciones */}
            <div className="space-y-2 text-xs text-gray-600">
              {candidate.location && (
                <div className="flex items-center gap-1 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
                  <MapPin className="h-3 w-3 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                  <span className="truncate">{candidate.location}</span>
                </div>
              )}

              {candidate.experience_years && (
                <div className="flex items-center gap-1 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
                  <Clock className="h-3 w-3 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                  <span>{candidate.experience_years} años exp.</span>
                </div>
              )}

              <div className="flex items-center gap-1 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
                <Clock className="h-3 w-3 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                <span>Aplicó hace {getTimeAgo(candidate.applied_at)}</span>
              </div>
            </div>

            {/* Contact info con efectos hover mejorados */}
            <div className="pt-2 border-t border-gray-100 space-y-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {candidate.phone && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-300 hover:translate-x-1">
                      <Phone className="h-3 w-3 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                      <span className="truncate">{candidate.phone}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Llamar a {candidate.name}</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-300 hover:translate-x-1">
                    <Mail className="h-3 w-3 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enviar email a {candidate.name}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Notes preview */}
            {candidate.notes && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 line-clamp-2 break-words">{candidate.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
