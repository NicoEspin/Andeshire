"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";
import { fetchJobScoreboards } from "@/state/api/Jobs/Id/FetchJobScoreboards";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import AddJobForm from "./AddJobForm";
import EditJobForm from "./EditJobForm";

const JobForms: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { scoreboards, loading, error, loaded, availableTemplates } =
    useSelector((state: RootState) => state.jobScoreboards);

  useEffect(() => {
    if (!loaded && !loading) {
      fetchJobScoreboards(
        dispatch,
        "79f03bb1-ada2-4c99-998e-74c2da154c51" // 🔒 ID fijo por ahora
      );
    }
  }, [dispatch, loaded, loading]);

  return (
    <Card className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Formularios</h2>
        <AddJobForm
          availableTemplates={availableTemplates}
          getTemplateFields={(templateId) => {
            // Busca la plantilla y devuelve sus campos
            const scoreboard = scoreboards.find(
              (s) => s.template_id === templateId
            );
            return scoreboard?.entries || [];
          }}
        />
      </div>

      {/* Estado de carga y error */}
      {loading && <p className="text-gray-500">Cargando formularios...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Lista de formularios */}
      <div className="space-y-4 max-h-100 overflow-auto">
        {scoreboards.length === 0 && !loading && (
          <p className="text-gray-500">No hay formularios disponibles.</p>
        )}
        {scoreboards.map((scoreboard) => (
          <Card key={scoreboard.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{scoreboard.template_name}</h3>
                <p className="text-sm text-gray-500">
                  Actualizado: {scoreboard.updated_at}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <EditJobForm scoreboard={scoreboard} />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="mt-4">
              {scoreboard.entries.map((entry) => (
                <div key={entry.id}>
                  <p className="text-sm font-medium">{entry.field_name}</p>
                  <p className="text-sm text-gray-700">{entry.value}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default JobForms;
