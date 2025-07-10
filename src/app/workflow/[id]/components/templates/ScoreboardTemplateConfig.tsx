"use client";

import { RootState } from "@/app/redux";
import { RemoteSelect } from "../RemoteSelect";
import { fetchWorkflowScoreboards } from "@/state/api/Workflows/Id/fetchWorkflowScoreboards";
import { TemplateSet } from "@/app/Types/Workflow/WorkflowDetailTypes"; // 👈 importa TemplateSet si lo usas

type ScoreboardTemplateConfigProps = {
  action: any;
  onChange: (updated: any) => void;
  templateSet?: TemplateSet; // 👈 lo dejo opcional para mantener consistencia
};

export function ScoreboardTemplateConfig({
  action,
  onChange,
  templateSet, // 👈 disponible si quieres usarlo
}: ScoreboardTemplateConfigProps) {
  // Puedes usar templateSet para filtrar opciones si hace falta
  console.log("TemplateSet:", templateSet);

  return (
    <RemoteSelect
      label="Formulario"
      sliceSelector={(state: RootState) => ({
        loading: state.workflowScoreboards.loading,
        error: state.workflowScoreboards.error,
        data: state.workflowScoreboards.templates,
        loaded: state.workflowScoreboards.loaded,
      })}
      fetchAction={fetchWorkflowScoreboards}
      getValue={(item) => item.id}
      getLabel={(item) => item.name}
      value={action.scoreboard_template_id || ""}
      onChange={(val) =>
        onChange({
          ...action,
          scoreboard_template_id: val,
        })
      }
      placeholder="Selecciona formulario"
    />
  );
}
