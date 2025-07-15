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
import { useTranslations } from "next-intl";

interface EmailAgent {
  id: string;
  name: string;
  prompt: string;
  task: string;
  first_message: string;
  direction: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ViewEmailAgentsSidebarProps {
  agent: EmailAgent;
  onEdit: () => void;
  onClose: () => void;
}

export default function ViewEmailAgentsSidebar({
  agent,
  onEdit,
  onClose,
}: ViewEmailAgentsSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.EmailAgents.SidebarView");

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
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">{agent.name}</SheetTitle>
        <SheetDescription>{t("ViewDescription")}</SheetDescription>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <strong>{t("Prompt")}:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md mt-1">
            {renderWithBadges(agent.prompt)}
          </p>
        </div>

        <div>
          <strong>{t("Task")}:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md mt-1">
            {renderWithBadges(agent.task)}
          </p>
        </div>

        <div>
          <strong>{t("FirstMessage")}:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md mt-1">
            {renderWithBadges(agent.first_message)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
