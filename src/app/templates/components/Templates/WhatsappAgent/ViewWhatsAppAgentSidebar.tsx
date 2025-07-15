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
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";

interface WhatsAppAgent {
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

interface ViewWhatsAppAgentSidebarProps {
  agent: WhatsAppAgent;
  onEdit: () => void;
  onClose: () => void;
}

export default function ViewWhatsAppAgentSidebar({
  agent,
  onEdit,
  onClose,
}: ViewWhatsAppAgentSidebarProps) {
  // Extrae todas las variables del prompt y first_message
  const keys = [
    ...extractKeysFromContent(agent.prompt),
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
        <SheetDescription className="text-muted-foreground">
          View WhatsApp Agent Details
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-5">
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
            Prompt:
          </h4>
          <p className="border rounded-md p-4 whitespace-pre-wrap">
            {renderWithBadges(agent.prompt)}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
            Task:
          </h4>
          <p className="border rounded-md p-4 bg-muted">{agent.task}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
            First Message:
          </h4>
          <p className="border rounded-md p-4 whitespace-pre-wrap">
            {renderWithBadges(agent.first_message)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-sm text-muted-foreground">Direction:</h4>
          <Badge variant="outline" className="capitalize">
            {agent.direction}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-sm text-muted-foreground">Status:</h4>
          <Badge
            variant="outline"
            className={`capitalize ${
              agent.status === "active"
                ? "text-green-600 border-green-600"
                : "text-muted-foreground"
            }`}
          >
            {agent.status}
          </Badge>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-muted-foreground">Created At:</h4>
          <p>{new Date(agent.created_at).toLocaleDateString()}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-muted-foreground">Updated At:</h4>
          <p>{new Date(agent.updated_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEdit}>Edit</Button>
      </div>
    </SheetContent>
  );
}
