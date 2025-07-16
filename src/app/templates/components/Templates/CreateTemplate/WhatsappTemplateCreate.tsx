"use client";

import * as React from "react";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import mockKeys from "../../data/mockkeys.json";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown"; // ✅ importa tu nuevo componente

interface WhatsappTemplateCreateProps {
  onCancel: () => void;
}

export default function WhatsappTemplateCreate({
  onCancel,
}: WhatsappTemplateCreateProps) {
  const [name, setName] = React.useState("");
  const [content, setContent] = React.useState("");

  // Variables disponibles
  const allVariables: string[] = mockKeys.data.all_keys;

  // Ref para insertar variable en el editor
  const editorRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    console.log("Save new WhatsApp Template:", { name, content });
    onCancel();
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">
          Crear una plantilla de WhatsApp
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <Label>Nombre de la Plantilla</Label>
          <Input
            placeholder="Nombre de la Plantilla"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label>Contenido</Label>
          <VariableRichTextEditor
            ref={editorRef}
            value={content}
            allVariables={allVariables}
            onChange={setContent}
          />

          <div className="mt-2">
            <Label className="block mb-1">Agregar Variable</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={editorRef}
            />
          </div>
        </div>
      </div>

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
