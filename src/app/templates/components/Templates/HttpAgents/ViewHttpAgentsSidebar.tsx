"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { useTranslations } from "next-intl";
import type { HttpAgent } from "./HttpAgentsSidebar";

interface ViewHttpAgentsSidebarProps {
  agent: HttpAgent;
  onEdit: () => void;
  onClose: () => void;
}

export default function ViewHttpAgentsSidebar({
  agent,
  onEdit,
  onClose,
}: ViewHttpAgentsSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.HTTPAgents.SidebarView");

  // Extrae las variables del request_body
  const keys = extractKeysFromContent(agent.request_body).map((key) => ({
    key,
  }));
  const keyMetaMap = useKeyMetaMap(keys);

  const renderWithBadges = (text: string) => {
    const regex = /{{(.*?)}}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let i = 0;

    while ((match = regex.exec(text)) !== null) {
      const before = text.substring(lastIndex, match.index);
      if (before) {
        parts.push(<span key={`text-${i}`}>{before}</span>);
        i++;
      }

      const keyName = match[1].trim();
      const meta = keyMetaMap[keyName];

      if (meta) {
        parts.push(
          <Badge
            key={`badge-${keyName}-${match.index}-${i}`}
            style={{
              backgroundColor: meta.color,
              color: "#fff",
              margin: "0 2px",
            }}
          >
            {meta.label}
          </Badge>
        );
      } else {
        parts.push(
          <span key={`unknown-${keyName}-${match.index}-${i}`}>
            {`{{${keyName}}}`}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
      i++;
    }

    const after = text.substring(lastIndex);
    if (after) {
      parts.push(<span key={`text-after-${i}`}>{after}</span>);
    }

    return parts;
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{agent.name}</SheetTitle>
        <p className="text-sm text-muted-foreground">{t("Title")}</p>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <strong>{t("Method")}:</strong> {agent.method}
        </div>
        <div>
          <strong>{t("URL")}:</strong> {agent.url}
        </div>
        <div>
          <strong>{t("Timeout")}:</strong> {agent.timeout}s
        </div>
        <div>
          <strong>{t("Retries")}:</strong> {agent.retries}
        </div>
        <div>
          <strong>{t("Body")}:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md">
            {renderWithBadges(agent.request_body)}
          </p>
        </div>
        <div>
          <strong>{t("CreatedAt")}:</strong>{" "}
          {new Date(agent.created_at).toLocaleDateString()}
        </div>
        <div>
          <strong>{t("UpdatedAt")}:</strong>{" "}
          {new Date(agent.updated_at).toLocaleDateString()}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        <Button variant="outline" onClick={onClose}>
          {t("Close")}
        </Button>
        <Button onClick={onEdit}>{t("Edit")}</Button>
      </div>
    </SheetContent>
  );
}
