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

import { useTranslations } from "next-intl";
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
  const t = useTranslations("Templates.TemplatesView.LinkedinAgents.Create");

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
        <SheetTitle className="text-xl font-semibold">{t("Title")}</SheetTitle>
        <SheetDescription className="text-muted-foreground">
          {t("Description")}
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-col gap-5 flex-grow">
        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Name")}
          </Label>
          <Input
            placeholder={t("Fields.NamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Description")}
          </Label>
          <Input
            placeholder={t("Fields.DescriptionPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          <div>
            <Label className="text-sm font-medium mb-1 block">
              {t("Fields.Direction")}
            </Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger>
                <SelectValue placeholder={t("Fields.Direction")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Outbound">
                  {t("Dropdowns.DirectionOutbound")}
                </SelectItem>
                <SelectItem value="Inbound">
                  {t("Dropdowns.DirectionInbound")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">
              {t("Fields.Status")}
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder={t("Fields.Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">
                  {t("Dropdowns.StatusActive")}
                </SelectItem>
                <SelectItem value="Inactive">
                  {t("Dropdowns.StatusInactive")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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
            <Label className="text-xs font-medium text-muted-foreground mb-1 block">
              {t("AddVariablePrompt")}
            </Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={promptEditorRef}
            />
          </div>
        </div>

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
            <Label className="text-xs font-medium text-muted-foreground mb-1 block">
              {t("AddVariableTask")}
            </Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={taskEditorRef}
            />
          </div>
        </div>

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
            <Label className="text-xs font-medium text-muted-foreground mb-1 block">
              {t("AddVariableFirstMessage")}
            </Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={firstMessageEditorRef}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          {t("Actions.Cancel")}
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleSave}
        >
          {t("Actions.Save")}
        </Button>
      </div>
    </SheetContent>
  );
}
