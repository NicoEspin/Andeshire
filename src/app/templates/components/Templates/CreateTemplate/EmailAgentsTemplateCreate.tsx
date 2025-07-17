"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    direction: string;
    status: string;
  }) => void;
}

export default function EmailAgentsTemplateCreate({
  onCancel,
  onSave,
}: EmailAgentsTemplateCreateProps) {
  const t = useTranslations("Templates.TemplatesView.EmailAgents.Create");

  const [name, setName] = React.useState("");
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
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-5 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        <div>
          <Label className="block mb-1">{t("Name")}</Label>
          <Input
            placeholder={t("NamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          <div>
            <Label className="text-sm font-medium mb-1 block">
              {t("Direction")}
            </Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger>
                <SelectValue placeholder={t("DirectionPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Outbound">Outbound</SelectItem>
                <SelectItem value="Inbound">Inbound</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">
              {t("Status")}
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder={t("StatusPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="block mb-1">{t("Prompt")}</Label>
          <VariableRichTextEditor
            ref={promptEditorRef}
            value={prompt}
            allVariables={allVariables}
            onChange={setPrompt}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariablePrompt")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={promptEditorRef}
            />
          </div>
        </div>

        <div>
          <Label className="block mb-1">{t("Task")}</Label>
          <VariableRichTextEditor
            ref={taskEditorRef}
            value={task}
            allVariables={allVariables}
            onChange={setTask}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariableTask")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={taskEditorRef}
            />
          </div>
        </div>

        <div>
          <Label className="block mb-1">{t("FirstMessage")}</Label>
          <VariableRichTextEditor
            ref={firstMessageEditorRef}
            value={firstMessage}
            allVariables={allVariables}
            onChange={setFirstMessage}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariableFirstMessage")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={firstMessageEditorRef}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          {t("Cancel")}
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleSave}
        >
          {t("Save")}
        </Button>
      </div>
    </SheetContent>
  );
}
