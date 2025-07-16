"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import mockKeys from "../../data/mockkeys.json";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";

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
  const t = useTranslations(
    "Templates.TemplatesView.WhatsApp.WhatsAppSidebar.Edit"
  );

  const [name, setName] = React.useState<string>(template.name);
  const [content, setContent] = React.useState<string>(template.content);

  // 🗂️ Todas las variables del mock
  const allVariables: string[] = mockKeys.data.all_keys;

  // 🗂️ Mapa para todas las variables (para dropdown)
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  // Ref para invocar inserción de variable
  const editorRef = React.useRef<VariableRichTextEditorHandle>(null);

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <Label>{t("TemplateName")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Label>{t("Content")}</Label>
          <VariableRichTextEditor
            ref={editorRef}
            value={content || ""}
            allVariables={allVariables}
            onChange={setContent}
          />

          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {t("SelectVariable")}
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
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="secondary" onClick={onSave}>
          {t("Save")}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {t("Cancel")}
        </Button>
      </div>
    </SheetContent>
  );
}
