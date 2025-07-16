"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { VariableRichTextEditorHandle } from "./VariableRichTextEditor";

interface VariableDropdownProps {
  allVariables: string[];
   editorRef: React.RefObject<VariableRichTextEditorHandle | null>;
}

export default function VariableDropdown({
  allVariables,
  editorRef,
}: VariableDropdownProps) {
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Seleccionar variable
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {allVariables.map((v) => {
          const meta = allKeysMap[v];
          if (!meta) return null;

          return (
            <DropdownMenuItem
              key={v}
              onSelect={() => editorRef.current?.insertVariable(v)}
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
  );
}
