"use client";

import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Building2,
  Briefcase,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import CandidateFiles from "./CandidateFiles";

type CandidateExperienceProps = {
  candidate: CandidateDetail;
};

export default function CandidateExperience({
  candidate,
}: CandidateExperienceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Experience */}
      <div className="space-y-8 ">
        {/* Header */}
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold text-gray-900">Experiencia</h2>
          <Button
            variant="default"
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Experiencia
          </Button>
        </div>

        {/* Timeline */}
        <div className="space-y-8 border-l-4 border-purple-700 pl-6 relative">
          {candidate.experiences?.map((exp, index) => (
            <div key={exp.id} className="relative pb-8">
              <span className="absolute left-[-30px] top-0">
                <div className="h-4 w-4 bg-purple-700 rounded-full"></div>
              </span>

              <div className="bg-white shadow-sm p-5 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-700" />
                  {exp.role_name}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-700">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  <span>{exp.company_name}</span>
                </div>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-purple-700" />
                  <span>{exp.duration}</span>
                </div>

                {exp.role_description && (
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                    {exp.role_description}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-purple-700 border-purple-700 hover:bg-purple-50"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Files */}
      <CandidateFiles candidate={candidate} />
    </div>
  );
}
