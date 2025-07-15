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

import { CallAgent } from "./CallAgentsSidebar";

interface ViewProps {
  agent: CallAgent;
  onEdit: () => void;
  onClose: () => void;
}

export default function ViewCallAgentsSidebar({
  agent,
  onEdit,
  onClose,
}: ViewProps) {
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
        <SheetDescription>Detalles del Call Agent</SheetDescription>
      </SheetHeader>

      <div className="space-y-4">
        <div>
          <strong>Prompt:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md">
            {renderWithBadges(agent.prompt)}
          </p>
        </div>

        <div>
          <strong>First Message:</strong>
          <p className="whitespace-pre-wrap border p-4 rounded-md">
            {renderWithBadges(agent.first_message)}
          </p>
        </div>

        <div>
          <strong>Max Attempts:</strong> {agent.max_attempts}
        </div>

        <div>
          <strong>Interval (min):</strong> {agent.interval_minutes}
        </div>

        <div>
          <strong>Ask Permission:</strong>{" "}
          {agent.ask_permission ? (
            <Badge variant="outline" className="text-green-600 border-green-600">
              Yes
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              No
            </Badge>
          )}
        </div>

        <div>
          <strong>Created At:</strong>{" "}
          {new Date(agent.created_at).toLocaleDateString()}
        </div>

        <div>
          <strong>Updated At:</strong>{" "}
          {new Date(agent.updated_at).toLocaleDateString()}
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
