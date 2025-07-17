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
import { Input } from "@/components/ui/input";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { VariableRichTextEditorHandle } from "./VariableRichTextEditor";
import { useTranslations } from "next-intl";

interface VariableDropdownProps {
  allVariables: string[];
  editorRef: React.RefObject<VariableRichTextEditorHandle | null>;
}

export default function VariableDropdown({
  allVariables,
  editorRef,
}: VariableDropdownProps) {
  const t = useTranslations("Templates.TemplatesView.VariableDropdown");
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));
  const [search, setSearch] = React.useState("");

  const filteredVariables = allVariables.filter((v) => {
    const meta = allKeysMap[v];
    return meta?.label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {t("SelectVariable")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto p-2 space-y-1">
        <Input
          placeholder={t("SearchPlaceholder")}
          value={search}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />
        {filteredVariables.length > 0 ? (
          filteredVariables.map((v) => {
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
          })
        ) : (
          <div className="text-sm text-muted-foreground px-2 py-1">
            {t("NoResults")}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
