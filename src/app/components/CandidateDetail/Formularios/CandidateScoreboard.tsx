"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Share2, Pencil, Trash2 } from "lucide-react";
import AddCandidateForm from "./AddCandidateForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";
import { fetchCandidateScoreboards } from "@/state/api/Candidates/id/FetchCandidateScoreboards";


const CandidateScoreboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Obtiene del store
  const { candidateName, scoreboards, availableTemplates, loading, loaded } = useSelector(
    (state: RootState) => state.candidateScoreboards
  );

  // Llama al fetch solo una vez
useEffect(() => {
  if (!loaded) {
    fetchCandidateScoreboards(dispatch, "id");
  }
}, [dispatch, loaded]);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-semibold">
            Formularios de {candidateName || "Candidato"}
          </h2>
          <AddCandidateForm templates={availableTemplates}   />
        </div>

        {/* Loader */}
        {loading && <p className="text-gray-500">Cargando formularios...</p>}

        {/* Renderizar cada scoreboard */}
        {!loading &&
          scoreboards.map((scoreboard) => (
            <Card key={scoreboard.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>{scoreboard.template_name}</CardTitle>
                  <CardDescription>
                    Actualizado: {scoreboard.updated_at} | Recruiter: {scoreboard.recruiter_name}
                  </CardDescription>
                </div>

                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-green-600">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Compartir</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Editar</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Eliminar</TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {scoreboard.entries.map((entry) => (
                  <div key={entry.id}>
                    <h4 className="text-sm font-medium text-gray-700">{entry.field_name}</h4>
                    <p className="text-sm">{entry.value || "-"}</p>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
                    scoreboard.to_complete
                      ? "text-yellow-700 bg-yellow-100"
                      : "text-green-700 bg-green-100"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      scoreboard.to_complete ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  ></span>
                  {scoreboard.to_complete ? "Pendiente de completar" : "Completado"}
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </TooltipProvider>
  );
};

export default CandidateScoreboard;
