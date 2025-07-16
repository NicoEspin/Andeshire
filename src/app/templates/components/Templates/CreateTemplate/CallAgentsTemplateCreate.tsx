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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";
import mockKeys from "../../data/mockkeys.json";

interface CallAgentsTemplateCreateProps {
  onCancel: () => void;
  onSave?: (data: {
    name: string;
    description: string;
    prompt: string;
    first_message: string;
    max_attempts: number;
    interval_minutes: number;
    ask_permission: boolean;
    direction: string;
    status: string;
  }) => void;
}

export default function CallAgentsTemplateCreate({
  onCancel,
  onSave,
}: CallAgentsTemplateCreateProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [firstMessage, setFirstMessage] = React.useState("");
  const [maxAttempts, setMaxAttempts] = React.useState(3);
  const [intervalMinutes, setIntervalMinutes] = React.useState(10);
  const [askPermission, setAskPermission] = React.useState(true);
  const [direction, setDirection] = React.useState("Outbound");
  const [status, setStatus] = React.useState("Active");

  const allVariables = mockKeys.data.all_keys;

  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    if (onSave) {
      onSave({
        name,
        description,
        prompt,
        first_message: firstMessage,
        max_attempts: maxAttempts,
        interval_minutes: intervalMinutes,
        ask_permission: askPermission,
        direction,
        status,
      });
    }
    onCancel();
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-5 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">
          Crear plantilla de Llamada
        </SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        {/* Nombre */}
        <div>
          <Label className="block mb-1">Nombre de la plantilla</Label>
          <Input
            placeholder="Ej: Validación Inglés"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div>
          <Label className="block mb-1">Descripción</Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2 min-h-[80px]"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-6">
          <div>
            <Label className="text-sm font-medium mb-1 block">Direction</Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona dirección" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Outbound">Outbound</SelectItem>
                <SelectItem value="Inbound">Inbound</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prompt */}
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

        {/* Primer mensaje */}
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

        {/* Intentos máximos */}
        <div>
          <Label className="block mb-1">Intentos máximos</Label>
          <Input
            type="number"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
          />
        </div>

        {/* Intervalo entre intentos */}
        <div>
          <Label className="block mb-1">Intervalo (minutos)</Label>
          <Input
            type="number"
            value={intervalMinutes}
            onChange={(e) => setIntervalMinutes(Number(e.target.value))}
          />
        </div>

        {/* Permiso */}
        <div>
          <Label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={askPermission}
              onChange={(e) => setAskPermission(e.target.checked)}
              className="mr-2"
            />
            ¿Pedir permiso antes de llamar?
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave}>
          Guardar
        </Button>
      </div>
    </SheetContent>
  );
}
