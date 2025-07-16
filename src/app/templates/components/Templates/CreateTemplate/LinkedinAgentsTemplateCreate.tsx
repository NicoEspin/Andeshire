"use client";

import * as React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";
import mockKeys from "../../data/mockkeys.json";

interface LinkedinAgentsTemplateCreateProps {
  onCancel: () => void;
  onSave?: (data: {
    name: string;
    description: string;
    prompt: string;
    task: string;
    first_message: string;
    direction: string;
    status: string;
  }) => void;
}

export default function LinkedinAgentsTemplateCreate({
  onCancel,
  onSave,
}: LinkedinAgentsTemplateCreateProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [task, setTask] = React.useState("");
  const [firstMessage, setFirstMessage] = React.useState("");
  const [direction, setDirection] = React.useState("Outbound");
  const [status, setStatus] = React.useState("Active");

  const allVariables = mockKeys.data.all_keys;

  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const taskEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef =
    React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    if (onSave) {
      onSave({
        name,
        description,
        prompt,
        task,
        first_message: firstMessage,
        direction,
        status,
      });
    }
    onCancel();
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">
          Crear plantilla de LinkedIn
        </SheetTitle>
        <SheetDescription className="text-muted-foreground">
          Define el comportamiento del agente de mensajes de LinkedIn.
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        {/* Nombre */}
        <div>
          <Label className="text-sm font-medium mb-1 block">Nombre</Label>
          <Input
            placeholder="Ej: Seguimiento post entrevista"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div>
          <Label className="text-sm font-medium mb-1 block">Descripción</Label>
          <Input
            placeholder="Breve descripción de la plantilla"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <Label className="text-sm font-medium mb-1 block">Prompt</Label>
          <VariableRichTextEditor
            ref={promptEditorRef}
            value={prompt}
            allVariables={allVariables}
            onChange={setPrompt}
          />
          <div className="mt-2">
            <VariableDropdown
              allVariables={allVariables}
              editorRef={promptEditorRef}
            />
          </div>
        </div>

        {/* Tarea */}
        <div>
          <Label className="text-sm font-medium mb-1 block">Tarea</Label>
          <VariableRichTextEditor
            ref={taskEditorRef}
            value={task}
            allVariables={allVariables}
            onChange={setTask}
          />
          <div className="mt-2">
            <VariableDropdown
              allVariables={allVariables}
              editorRef={taskEditorRef}
            />
          </div>
        </div>

        {/* Primer mensaje */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            Primer mensaje
          </Label>
          <VariableRichTextEditor
            ref={firstMessageEditorRef}
            value={firstMessage}
            allVariables={allVariables}
            onChange={setFirstMessage}
          />
          <div className="mt-2">
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
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleSave}
        >
          Guardar
        </Button>
      </div>
    </SheetContent>
  );
}
