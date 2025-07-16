"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import mockKeys from "../../data/mockkeys.json";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";

interface EmailAgentsTemplateCreateProps {
  onCancel: () => void;
  onSave?: (data: {
    name: string;
    prompt: string;
    task: string;
    first_message: string;
  }) => void;
}

export default function EmailAgentsTemplateCreate({
  onCancel,
  onSave,
}: EmailAgentsTemplateCreateProps) {
  const [name, setName] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [task, setTask] = React.useState("");
  const [firstMessage, setFirstMessage] = React.useState("");

  const allVariables = mockKeys.data.all_keys;

  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const taskEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    if (onSave) {
      onSave({
        name,
        prompt,
        task,
        first_message: firstMessage,
      });
    }
    onCancel(); // siempre cerrar
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-5 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">
          Crear plantilla de Email
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        <div>
          <Label className="block mb-1">Nombre de la plantilla</Label>
          <Input
            placeholder="Ej: Email seguimiento técnico"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label className="block mb-1">Prompt</Label>
          <VariableRichTextEditor
            ref={promptEditorRef}
            value={prompt}
            allVariables={allVariables}
            onChange={setPrompt}
          />
          <div className="mt-2">
            <Label className="block mb-1">Agregar variable</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={promptEditorRef}
            />
          </div>
        </div>

        <div>
          <Label className="block mb-1">Tarea</Label>
          <VariableRichTextEditor
            ref={taskEditorRef}
            value={task}
            allVariables={allVariables}
            onChange={setTask}
          />
          <div className="mt-2">
            <Label className="block mb-1">Agregar variable</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={taskEditorRef}
            />
          </div>
        </div>

        <div>
          <Label className="block mb-1">Primer mensaje</Label>
          <VariableRichTextEditor
            ref={firstMessageEditorRef}
            value={firstMessage}
            allVariables={allVariables}
            onChange={setFirstMessage}
          />
          <div className="mt-2">
            <Label className="block mb-1">Agregar variable</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={firstMessageEditorRef}
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
