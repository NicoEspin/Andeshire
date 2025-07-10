"use client";

import { RootState } from "@/app/redux";
import { RemoteSelect } from "../RemoteSelect";
import { fetchWorkflowEmail } from "@/state/api/Workflows/Id/fetchWorkflowEmail";

export function EmailTemplateConfig({
  action,
  onChange,
}: {
  action: any;
  onChange: (updated: any) => void;
}) {
  return (
    <RemoteSelect
      label="Plantilla de Email"
      sliceSelector={(state: RootState) => ({
        loading: state.workflowEmail.loading,
        error: state.workflowEmail.error,
        data: state.workflowEmail.templates,
        loaded: state.workflowEmail.loaded,
      })}
      fetchAction={fetchWorkflowEmail}
      getValue={(item) => item.id}
      getLabel={(item) => item.name}
      value={action.email_template_id || ""}
      onChange={(val) =>
        onChange({
          ...action,
          email_template_id: val,
        })
      }
      placeholder="Selecciona plantilla de email"
    />
  );
}
