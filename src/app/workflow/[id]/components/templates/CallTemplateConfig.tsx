// src/components/templates/CallTemplateConfig.tsx

"use client";

import { RootState } from "@/app/redux";
import { RemoteSelect } from "../RemoteSelect";
import { fetchWorkflowCall } from "@/state/api/Workflows/Id/fetchWorkflowCall";

export function CallTemplateConfig({
  action,
  onChange,
}: {
  action: any;
  onChange: (updated: any) => void;
}) {
  return (
    <RemoteSelect
      label="Plantilla de Llamada"
      sliceSelector={(state: RootState) => ({
        loading: state.workflowCall.loading,
        error: state.workflowCall.error,
        data: state.workflowCall.templates,
        loaded: state.workflowCall.loaded,
      })}
      fetchAction={fetchWorkflowCall}
      getValue={(item) => item.id}
      getLabel={(item) => item.name}
      value={action.call_template_id}
      onChange={(val) =>
        onChange({
          ...action,
          call_template_id: val,
        })
      }
      placeholder="Selecciona plantilla de llamada"
    />
  );
}
