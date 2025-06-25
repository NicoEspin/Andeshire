import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Users, TrendingUp } from "lucide-react"
import { StageColumn } from "./stage-column"
import type { JobPipeline as JobPipelineType } from "../types/ats"

interface JobPipelineProps {
  pipeline: JobPipelineType
}

export function JobPipeline({ pipeline }: JobPipelineProps) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Pipeline de Candidatos
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">{pipeline.total_candidates} candidatos totales</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 overflow-hidden max-w-full">
        <ScrollArea className="w-full overflow-x-auto">
          <div className="flex gap-4 pb-4 w-full">
            {pipeline.stages
              .sort((a, b) => a.order - b.order)
              .map((stage) => (
                <StageColumn key={stage.id} stage={stage} />
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
