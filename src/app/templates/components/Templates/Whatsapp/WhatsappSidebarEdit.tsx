"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import mockKeys from "../../data/mockkeys.json";
import { useTranslations } from "next-intl";

import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";

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

  const allVariables: string[] = mockKeys.data.all_keys;
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
        {/* Nombre */}
        <div>
          <Label>{t("TemplateName")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Contenido */}
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
            <VariableDropdown
              allVariables={allVariables}
              editorRef={editorRef}
            />
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
