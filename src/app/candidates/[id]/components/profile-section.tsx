"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { CVCard } from "./cv-card";
import type { Candidate } from "../types/candidate";

interface ProfileSectionProps {
  candidate: Candidate;
}

export function ProfileSection({ candidate }: ProfileSectionProps) {
  return (
    <div className="space-y-8" data-driver-id="perfil">
      {/* Información Personal */}
      <div>
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 group">
                <label className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                  Email
                </label>
                <p className="text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                  {candidate.candidate_email}
                </p>
              </div>
              <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 group">
                <label className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                  Teléfono
                </label>
                <p className="text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                  {candidate.candidate_phone}
                </p>
              </div>
              <div className="hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 group">
                <label className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                  Posición aplicada
                </label>
                <p className="text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                  {candidate.position}
                </p>
              </div>
              <div className="md:col-span-2 hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 group">
                <label className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                  Estado
                </label>
                <div className="mt-1">
                  <Badge
                    variant={
                      candidate.scoreboards.some((sb) => sb.to_complete)
                        ? "destructive"
                        : "default"
                    }
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    {candidate.scoreboards.some((sb) => sb.to_complete)
                      ? "En proceso"
                      : "Evaluado"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna del CV */}
      <div>
        <CVCard cvDocument={candidate.cv_document} />
      </div>
    </div>
  );
}
