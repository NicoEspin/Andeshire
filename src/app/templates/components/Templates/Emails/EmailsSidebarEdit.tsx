"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import mockKeys from "../../data/mockkeys.json";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";

interface EmailSidebarEditProps {
  template: { name: string; subject: string; content: string };
  onCancel: () => void;
  onSave: (data: { name: string; subject: string; content: string }) => void;
}

export default function EmailSidebarEdit({
  template,
  onCancel,
  onSave,
}: EmailSidebarEditProps) {
  const t = useTranslations("Templates.TemplatesView.Email.SidebarEdit");

  const [name, setName] = React.useState(template.name);
  const [subject, setSubject] = React.useState(template.subject);
  const [content, setContent] = React.useState(template.content);

  const allVariables = mockKeys.data.all_keys;
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  const subjectEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const contentEditorRef = React.useRef<VariableRichTextEditorHandle>(null);

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        {/* Nombre de plantilla */}
        <div>
          <Label>{t("TemplateName")}</Label>
          <input
            className="w-full border rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Asunto */}
        <div>
          <Label>{t("Subject")}</Label>
          <VariableRichTextEditor
            ref={subjectEditorRef}
            value={subject}
            allVariables={allVariables}
            onChange={setSubject}
          />

          {/* Dropdown de variables para asunto */}
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
                      onSelect={() => subjectEditorRef.current?.insertVariable(v)}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="inline-block px-1 rounded"
                        style={{
                          backgroundColor: meta.color,
                          color: "#fff",
                        }}
                      >
                        {meta.label}
                      </span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Contenido */}
        <div>
          <Label>{t("Content")}</Label>
          <VariableRichTextEditor
            ref={contentEditorRef}
            value={content}
            allVariables={allVariables}
            onChange={setContent}
          />

          {/* Dropdown de variables para contenido */}
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
                      onSelect={() => contentEditorRef.current?.insertVariable(v)}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="inline-block px-1 rounded"
                        style={{
                          backgroundColor: meta.color,
                          color: "#fff",
                        }}
                      >
                        {meta.label}
                      </span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button
          variant="secondary"
          onClick={() => onSave({ name, subject, content })}
        >
          {t("Save")}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {t("Cancel")}
        </Button>
      </div>
    </SheetContent>
  );
}
