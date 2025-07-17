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

  const keys = [
    ...extractKeysFromContent(agent.request_body),
    ...extractKeysFromContent(agent.url),
    ...(agent.save_output || []),
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

  const renderBadgeList = (items: string[]) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((key) => {
        const meta = keyMetaMap[key];
        return meta ? (
          <Badge
            key={key}
            style={{ backgroundColor: meta.color, color: "#fff" }}
          >
            {meta.label}
          </Badge>
        ) : (
          <Badge variant="outline" key={key}>
            {key}
          </Badge>
        );
      })}
    </div>
  );

  const renderKeyValue = (obj: Record<string, string>) => (
    <div className="grid gap-2 mt-2">
      {Object.entries(obj).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between items-center border rounded-md p-2 text-sm bg-muted"
        >
          <span className="font-medium">{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{agent.name}</SheetTitle>
        <p className="text-sm text-muted-foreground">{t("Title")}</p>
      </SheetHeader>

      <div className="space-y-4 text-sm">
        <div>
          <strong>{t("Method")}:</strong> {agent.method}
        </div>

        <div>
          <strong>{t("URL")}:</strong>
          <p className="whitespace-pre-wrap break-all border p-4 rounded-md">
            {renderWithBadges(agent.url)}
          </p>
        </div>

        <div className="flex gap-4">
          <div>
            <strong>{t("Timeout")}:</strong> {agent.timeout}s
          </div>
          <div>
            <strong>{t("Retries")}:</strong> {agent.retries}
          </div>
        </div>

        <div>
          <strong>{t("Body")}:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md">
            {renderWithBadges(agent.request_body)}
          </p>
        </div>

        <div>
          <strong>{t("SaveOutput")}:</strong>
          {renderBadgeList(agent.save_output)}
        </div>

        <div>
          <strong>{t("QueryParams")}:</strong>
          {renderKeyValue(agent.query_params)}
        </div>

        <div>
          <strong>{t("Headers")}:</strong>
          {renderKeyValue(agent.headers)}
        </div>

        <div className="text-muted-foreground text-xs pt-4 border-t mt-4">
          <div>
            <strong>{t("CreatedAt")}:</strong>{" "}
            {new Date(agent.created_at).toLocaleString()}
          </div>
          <div>
            <strong>{t("UpdatedAt")}:</strong>{" "}
            {new Date(agent.updated_at).toLocaleString()}
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
