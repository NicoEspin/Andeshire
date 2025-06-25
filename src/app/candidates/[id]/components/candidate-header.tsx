"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { User, FileText, CheckCircle, Clock } from "lucide-react";
import type { Candidate } from "../types/candidate";

interface CandidateHeaderProps {
  candidate: Candidate;
}

export function CandidateHeader({ candidate }: CandidateHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const completedScoreboards = candidate.scoreboards.filter(
    (sb) => !sb.to_complete
  ).length;
  const totalScoreboards = candidate.scoreboards.length;

  return (
    <Card className="border-0 shadow-sm animate-in fade-in-0 slide-in-from-top-4 duration-700">
      <CardContent className="p-8">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 animate-in zoom-in-0 duration-500 delay-200">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-700">
              {getInitials(candidate.candidate_name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-300">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-400">
                {candidate.candidate_name}
              </h1>
              <p className="text-lg text-gray-600 mb-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-500">
                {candidate.position}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-600">
                <div className="flex items-center gap-2 hover:text-gray-900 transition-colors duration-200">
                  <User className="h-4 w-4" />
                  {candidate.candidate_email}
                </div>
                <div className="flex items-center gap-2 hover:text-gray-900 transition-colors duration-200">
                  <FileText className="h-4 w-4" />
                  {candidate.candidate_phone}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-700">
              <Badge
                variant="outline"
                className="px-3 py-1 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {completedScoreboards}/{totalScoreboards} Formularios
                completados
              </Badge>
              <Badge
                variant={
                  candidate.scoreboards.some((sb) => sb.to_complete)
                    ? "destructive"
                    : "default"
                }
                className="px-3 py-1 hover:scale-105 transition-all duration-200"
              >
                {candidate.scoreboards.some((sb) => sb.to_complete) ? (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Pendiente de completar
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Evaluación completa
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
