"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";
import mockKeys from "../../data/mockkeys.json";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface WhatsappSidebarEditProps {
  template: { name: string; content: string };
  onCancel: () => void;
  onSave: () => void;
}

export default function WhatsappSidebarEdit({
  template,
  onCancel,
  onSave,
}: WhatsappSidebarEditProps) {
  const [name, setName] = React.useState<string>(template.name);
  const [content, setContent] = React.useState<string>(template.content);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // 🗂️ Todas las variables del mock
  const allVariables: string[] = mockKeys.data.all_keys;

  // 🗂️ Mapa para todas las variables (para dropdown)
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  // 🗂️ Mapa solo para las variables actuales del contenido (para vista previa)
  const contentKeys = extractKeysFromContent(content).map((key) => ({ key }));
  const contentKeyMetaMap = useKeyMetaMap(contentKeys);

  const handleInsertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = content.substring(0, start);
    const after = content.substring(end);

    const insertText = `{{${variable}}}`;

    const newContent = before + insertText + after;
    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      const newCursorPos = start + insertText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  };

  const renderContentWithBadges = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let i = 0;

    while ((match = regex.exec(content)) !== null) {
      const before = content.substring(lastIndex, match.index);
      if (before) {
        parts.push(<span key={`text-${i}`}>{before}</span>);
        i++;
      }

      const key = match[1].trim();
      const meta = contentKeyMetaMap[key];

      if (meta) {
        parts.push(
          <Badge
            key={`badge-${key}-${i}`}
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
        parts.push(<span key={`unknown-${key}-${i}`}>{`{{${key}}}`}</span>);
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
        <SheetTitle>Editar Template</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <Label>Nombre del Template</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Label>Contenido</Label>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full border rounded-md p-2"
          />
          <div className="mt-2">
            <Label className="block mb-1">Agregar Variable</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Selecciona una variable...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {allVariables.map((v) => {
                  const meta = allKeysMap[v];
                  if (!meta) return null;

                  return (
                    <DropdownMenuItem
                      key={v}
                      onSelect={() => handleInsertVariable(v)}
                      className="flex items-center"
                    >
                      <Badge
                        style={{
                          backgroundColor: meta.color,
                          color: "#fff",
                          margin: "0",
                        }}
                      >
                        {meta.label}
                      </Badge>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <Label>Vista previa con Badges</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderContentWithBadges(content)}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="secondary" onClick={onSave}>
          Guardar
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </SheetContent>
  );
}
