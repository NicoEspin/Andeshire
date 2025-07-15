"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";

interface PromtDetailProps {
  agentId: string;
  chatId: string;
  prompt: string;
  task: string;
  firstMessage: string;
}

export default function PromtDetail({
  agentId,
  chatId,
  prompt,
  task,
  firstMessage,
}: PromtDetailProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Templates.TextAgents.PromtDetails");

  // Extrae variables de los tres campos
  const keys = [
    ...extractKeysFromContent(prompt),
    ...extractKeysFromContent(task),
    ...extractKeysFromContent(firstMessage),
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
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="hover:bg-muted cursor-pointer"
      >
        <Eye className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full min-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {t("Title")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-muted-foreground">
                  {t("AgentID")}
                </p>
                <p className="truncate">{agentId}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">
                  {t("ChatID")}
                </p>
                <p className="truncate">{chatId}</p>
              </div>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-1">
                {t("FirstMessage")}
              </p>
              <div className="border rounded-md p-3 bg-muted/50 whitespace-pre-wrap">
                {renderWithBadges(firstMessage)}
              </div>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-1">
                {t("Task")}
              </p>
              <div className="border rounded-md p-3 bg-muted/50 whitespace-pre-wrap">
                {renderWithBadges(task)}
              </div>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-1">
                {t("Prompt")}
              </p>
              <div className="border rounded-md p-3 bg-muted/50 whitespace-pre-wrap max-h-96 overflow-auto">
                {renderWithBadges(prompt)}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
