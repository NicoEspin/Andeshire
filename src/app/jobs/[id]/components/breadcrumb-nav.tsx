import { ChevronRight, Home, Briefcase } from "lucide-react"
import { Button } from "@/app/components/ui/button"

interface BreadcrumbNavProps {
  jobTitle: string
}

export function BreadcrumbNav({ jobTitle }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-auto font-normal transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105"
      >
        <Home className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
        Dashboard
      </Button>
      <ChevronRight className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-auto font-normal transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 hover:scale-105"
      >
        <Briefcase className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
        Trabajos
      </Button>
      <ChevronRight className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
      <span className="font-medium text-gray-900 truncate max-w-xs transition-colors duration-300 hover:text-blue-900">
        {jobTitle}
      </span>
    </nav>
  )
}
