"use client";

import * as React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { LinkedinAgent } from "./LinkedinAgentsSidebar";
import { useTranslations } from "next-intl";

interface ViewLinkedinAgentsSidebarProps {
  agent: LinkedinAgent;
  onEdit: () => void;
  onClose: () => void;
}

export default function ViewLinkedinAgentsSidebar({
  agent,
  onEdit,
  onClose,
}: ViewLinkedinAgentsSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.LinkedinAgents.SidebarView");

  const keys = [
    ...extractKeysFromContent(agent.prompt),
    ...extractKeysFromContent(agent.task),
    ...extractKeysFromContent(agent.first_message),
  ].map((key) => ({ key }));

  const keyMetaMap = useKeyMetaMap(keys);

  const renderWithBadges = (text: string) => {
    const regex = /{{(.*?)}}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const before = text.substring(lastIndex, match.index);
      if (before) parts.push(<span key={`before-${lastIndex}`}>{before}</span>);

      const keyName = match[1].trim();
      const meta = keyMetaMap[keyName];

      if (meta) {
        parts.push(
          <Badge
            key={keyName}
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
          <span key={`missing-${keyName}`}>{`{{${keyName}}}`}</span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    const after = text.substring(lastIndex);
    if (after) parts.push(<span key={`after-${lastIndex}`}>{after}</span>);

    return parts;
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{agent.name}</SheetTitle>
        <SheetDescription>{t("Description")}</SheetDescription>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <strong>{t("Prompt")}:</strong>
          <p>{renderWithBadges(agent.prompt)}</p>
        </div>
        <div>
          <strong>{t("Task")}:</strong>
          <p>{renderWithBadges(agent.task)}</p>
        </div>
        <div>
          <strong>{t("FirstMessage")}:</strong>
          <p>{renderWithBadges(agent.first_message)}</p>
        </div>
        <div>
          <strong>{t("Direction")}:</strong> {agent.direction}
        </div>
        <div>
          <strong>{t("Status")}:</strong> {agent.status}
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
