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
import { useTranslations } from "next-intl";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import mockKeys from "../../data/mockkeys.json";

import VariableRichTextEditor, {
  VariableRichTextEditorHandle,
} from "../VariableRichTextEditor";
import VariableDropdown from "../VariableDropdown";

interface WhatsAppAgent {
  id: string;
  name: string;
  prompt: string;
  task: string;
  first_message: string;
  direction: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface EditWhatsAppAgentSidebarProps {
  agent: WhatsAppAgent;
  onCancel: () => void;
  onSave: (updated: WhatsAppAgent) => void;
}

export default function EditWhatsAppAgentSidebar({
  agent,
  onCancel,
  onSave,
}: EditWhatsAppAgentSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.WhatsAppAgents.SidebarEdit");

  const [name, setName] = React.useState(agent.name);
  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [task, setTask] = React.useState(agent.task);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);

  const allVariables = mockKeys.data.all_keys;

  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const taskEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef = React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    onSave({
      ...agent,
      name,
      prompt,
      task,
      first_message: firstMessage,
    });
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">{t("Title")}</SheetTitle>
        <SheetDescription className="text-muted-foreground">
          {t("Description")}
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        {/* Nombre */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Name")}
          </Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("Placeholders.Name")}
          />
        </div>

        {/* Prompt */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Prompt")}
          </Label>
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

        {/* Task */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Task")}
          </Label>
          <VariableRichTextEditor
            ref={taskEditorRef}
            value={task}
            allVariables={allVariables}
            onChange={setTask}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={taskEditorRef}
            />
          </div>
        </div>

        {/* First Message */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.FirstMessage")}
          </Label>
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
      </div>

      <div className="flex justify-end gap-2 mt-auto border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          {t("Actions.Cancel")}
        </Button>
        <Button onClick={handleSave}>{t("Actions.Save")}</Button>
      </div>
    </SheetContent>
  );
}
