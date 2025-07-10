"use client";

import { RootState } from "@/app/redux";
import { RemoteSelect } from "../RemoteSelect";
import { fetchWorkflowScoreboards } from "@/state/api/Workflows/Id/fetchWorkflowScoreboards";
import { TemplateSet } from "@/app/Types/Workflow/WorkflowDetailTypes";
import { useTranslations } from "next-intl";

type ScoreboardTemplateConfigProps = {
  action: any;
  onChange: (updated: any) => void;
  templateSet?: TemplateSet;
};

export function ScoreboardTemplateConfig({
  action,
  onChange,
  templateSet,
}: ScoreboardTemplateConfigProps) {
  const t = useTranslations("WorkflowDetails.Templates.Scoreboards");

  console.log("TemplateSet:", templateSet);

  return (
    <RemoteSelect
      label={t("Label")}
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
      placeholder={t("Placeholder")}
    />
  );
}
