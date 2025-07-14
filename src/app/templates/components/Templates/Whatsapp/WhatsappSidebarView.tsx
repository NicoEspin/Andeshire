"use client";

import * as React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";

export default function WhatsappSidebarView({
  template,
  onEdit,
  onClose,
}: {
  template: any;
  onEdit: () => void;
  onClose: () => void;
}) {
  const keys = extractKeysFromContent(template.content).map((key) => ({
    key,
  }));
  const keyMetaMap = useKeyMetaMap(keys);

 const renderContentWithBadges = (content: string) => {
  const regex = /{{(.*?)}}/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let i = 0; // contador único global

  while ((match = regex.exec(content)) !== null) {
    const before = content.substring(lastIndex, match.index);
    if (before) {
      parts.push(<span key={`text-${i}`}>{before}</span>);
      i++;
    }

    const keyName = match[1].trim();
    const meta = keyMetaMap[keyName];

    if (meta) {
      parts.push(
        <Badge
          key={`badge-${keyName}-${match.index}-${i}`} // 🔑 único: incluye index y contador
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

  const after = content.substring(lastIndex);
  if (after) {
    parts.push(<span key={`text-after-${i}`}>{after}</span>);
  }

  return parts;
};


  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4"
    >
      <SheetHeader>
        <SheetTitle>{template.name}</SheetTitle>
        <SheetDescription>
          <span>ID: {template.id}</span>
          <br />
          <span>Creado: {new Date(template.created_at).toLocaleString()}</span>
          <br />
          <span>
            Actualizado: {new Date(template.updated_at).toLocaleString()}
          </span>
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col justify-between h-full">
        <div>
          <Label>Contenido</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderContentWithBadges(template.content)}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="secondary" onClick={onEdit}>
            Editar
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </SheetContent>
  );
}
