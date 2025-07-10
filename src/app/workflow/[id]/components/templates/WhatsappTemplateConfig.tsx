// src/components/templates/WhatsappTemplateConfig.tsx
"use client";

import { RootState } from "@/app/redux";

import { RemoteSelect } from "../RemoteSelect";
import { fetchWorkflowWhatsapp } from "@/state/api/Workflows/Id/fetchWorkflowWhatsapp";

export function WhatsappTemplateConfig({
  action,
  onChange,
}: {
  action: any;
  onChange: (updated: any) => void;
}) {
  return (
    <RemoteSelect
      label="Plantilla WhatsApp"
      sliceSelector={(state: RootState) => ({
        loading: state.workflowWhatsapp.loading,
        error: state.workflowWhatsapp.error,
        data: state.workflowWhatsapp.templates,
        loaded: state.workflowWhatsapp.loaded,
      })}
      fetchAction={fetchWorkflowWhatsapp}
      getValue={(item) => item.id}
      getLabel={(item) => item.name || "Sin nombre"}
      value={action.whatsapp_template_id}
      onChange={(val) => onChange({ ...action, whatsapp_template_id: val })}
      placeholder="Selecciona plantilla WhatsApp"
    />
  );
}
