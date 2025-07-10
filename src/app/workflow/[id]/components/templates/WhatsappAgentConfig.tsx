"use client";

import { useTranslations } from "next-intl";
import { RootState } from "@/app/redux";
import { fetchWhatsappAgents } from "@/state/api/Workflows/Id/fetchWhatsappAgent";
import { RemoteSelect } from "../RemoteSelect";

export function WhatsappAgentConfig({
  action,
  onChange,
}: {
  action: any;
  onChange: (updated: any) => void;
}) {
  const t = useTranslations("WorkflowDetails.Templates.WhatsAppAgent");

  return (
    <RemoteSelect
      label={t("label")}
      sliceSelector={(state: RootState) => ({
        loading: state.whatsappAgent.loading,
        error: state.whatsappAgent.error,
        data: state.whatsappAgent.agents,
        loaded: state.whatsappAgent.loaded,
      })}
      fetchAction={fetchWhatsappAgents}
      getValue={(item) => item.id}
      getLabel={(item) => item.name || t("fallbackName")}
      value={action.whatsapp_agent_id}
      onChange={(val) => onChange({ ...action, whatsapp_agent_id: val })}
      placeholder={t("placeholder")}
    />
  );
}
