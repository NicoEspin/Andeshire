import { Badge } from "@/app/components/ui/badge"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { CandidateCard } from "./candidate-card"
import type { Stage } from "../types/ats"
import { Users } from "lucide-react"

interface StageColumnProps {
  stage: Stage
}

export function StageColumn({ stage }: StageColumnProps) {
  return (
    <div className="flex-shrink-0 min-w-[280px] w-80 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300 animate-in fade-in-0 slide-in-from-bottom-4">
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0 transition-colors duration-300 hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate transition-colors duration-300 hover:text-blue-900">
            {stage.name}
          </h3>
          <Badge
            className={`${stage.color} font-medium flex-shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-sm`}
          >
            {stage.candidates.length}
          </Badge>
        </div>
      </div>

      {/* Candidates List */}
      <div className="p-3 overflow-hidden">
        <ScrollArea className="h-[500px] w-full">
          <div className="space-y-3 pr-2">
            {stage.candidates.length > 0 ? (
              stage.candidates.map((candidate, index) => (
                <div
                  key={candidate.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CandidateCard candidate={candidate} />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 animate-in fade-in-0 duration-1000">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center transition-colors duration-300 hover:bg-gray-200">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm">No hay candidatos en esta etapa</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
