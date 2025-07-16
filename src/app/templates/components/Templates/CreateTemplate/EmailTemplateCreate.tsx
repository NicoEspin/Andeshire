"use client";

import * as React from "react";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import mockKeys from "../../data/mockkeys.json";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";

interface EmailTemplateCreateProps {
  onCancel: () => void;
}

export default function EmailTemplateCreate({
  onCancel,
}: EmailTemplateCreateProps) {
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [content, setContent] = React.useState("");

  // Variables disponibles
  const allVariables: string[] = mockKeys.data.all_keys;

  const subjectEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const contentEditorRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    console.log("Save new Email Template:", { name, subject, content });
    onCancel();
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">
          Crear una plantilla de Email
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        {/* Nombre */}
        <div>
          <Label>Nombre de la Plantilla</Label>
          <Input
            placeholder="Nombre de la Plantilla"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Asunto */}
        <div>
          <Label>Asunto</Label>
          <VariableRichTextEditor
            ref={subjectEditorRef}
            value={subject}
            allVariables={allVariables}
            onChange={setSubject}
          />

          <div className="mt-2">
            <Label className="block mb-1">Agregar Variable</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={subjectEditorRef}
            />
          </div>
        </div>

        {/* Contenido */}
        <div>
          <Label>Contenido</Label>
          <VariableRichTextEditor
            ref={contentEditorRef}
            value={content}
            allVariables={allVariables}
            onChange={setContent}
          />

          <div className="mt-2">
            <Label className="block mb-1">Agregar Variable</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={contentEditorRef}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button className="bg-purple-600 text-white" onClick={handleSave}>
          Guardar
        </Button>
      </div>
    </SheetContent>
  );
}
