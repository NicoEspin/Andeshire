"use client";

import { RootState } from "@/app/redux";
import { RemoteSelect } from "../RemoteSelect";
import { fetchWorkflowEmail } from "@/state/api/Workflows/Id/fetchWorkflowEmail";
import { useTranslations } from "next-intl";

export function EmailTemplateConfig({
  action,
  onChange,
}: {
  action: any;
  onChange: (updated: any) => void;
}) {
  const t = useTranslations("WorkflowDetails.Templates.Email");

  return (
    <RemoteSelect
      label={t("Label")}
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
      placeholder={t("Placeholder")}
    />
  );
}
