"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";
import mockKeys from "../../data/mockkeys.json";
import { CallAgent } from "./CallAgentsSidebar";

interface EditProps {
  agent: CallAgent;
  onCancel: () => void;
  onSave: (updated: CallAgent) => void;
}

export default function EditCallAgentsSidebar({
  agent,
  onCancel,
  onSave,
}: EditProps) {
  const t = useTranslations("Templates.TemplatesView.CallAgents.SidebarEdit");

  const [name, setName] = React.useState(agent.name);
  const [description, setDescription] = React.useState(agent.description || "");
  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);
  const [maxAttempts, setMaxAttempts] = React.useState(agent.max_attempts);
  const [intervalMinutes, setIntervalMinutes] = React.useState(agent.interval_minutes);
  const [askPermission, setAskPermission] = React.useState(agent.ask_permission);

  const allVariables = mockKeys.data.all_keys;

  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    onSave({
      ...agent,
      name,
      description,
      prompt,
      first_message: firstMessage,
      max_attempts: maxAttempts,
      interval_minutes: intervalMinutes,
      ask_permission: askPermission,
    });
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-6 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        {/* Nombre */}
        <div>
          <Label>{t("Name")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Descripción */}
        <div>
          <Label>{t("Description")}</Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2 min-h-[80px]"
          />
        </div>

        {/* Prompt */}
        <div>
          <Label>{t("Prompt")}</Label>
          <VariableRichTextEditor
            ref={promptEditorRef}
            value={prompt}
            allVariables={allVariables}
            onChange={setPrompt}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={promptEditorRef}
            />
          </div>
        </div>

        {/* First Message */}
        <div>
          <Label>{t("FirstMessage")}</Label>
          <VariableRichTextEditor
            ref={firstMessageEditorRef}
            value={firstMessage}
            allVariables={allVariables}
            onChange={setFirstMessage}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={firstMessageEditorRef}
            />
          </div>
        </div>

        {/* Máximos intentos */}
        <div>
          <Label>{t("MaxAttempts")}</Label>
          <Input
            type="number"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
          />
        </div>

        {/* Intervalo en minutos */}
        <div>
          <Label>{t("IntervalMinutes")}</Label>
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
            {t("AskPermission")}
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button onClick={handleSave}>{t("Save")}</Button>
      </div>
    </SheetContent>
  );
}
