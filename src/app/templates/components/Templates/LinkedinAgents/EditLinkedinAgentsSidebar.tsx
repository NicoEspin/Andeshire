"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
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
import { LinkedinAgent } from "./LinkedinAgentsSidebar";

interface EditLinkedinAgentsSidebarProps {
  agent: LinkedinAgent;
  onCancel: () => void;
  onSave: (updated: LinkedinAgent) => void;
}

export default function EditLinkedinAgentsSidebar({
  agent,
  onCancel,
  onSave,
}: EditLinkedinAgentsSidebarProps) {
  const t = useTranslations(
    "Templates.TemplatesView.LinkedinAgents.SidebarEdit"
  );

  const [name, setName] = React.useState(agent.name);
  const [description, setDescription] = React.useState(agent.description ?? "");
  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [task, setTask] = React.useState(agent.task);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);
  const [status, setStatus] = React.useState(agent.status || "Active");
  const [direction, setDirection] = React.useState(
    agent.direction || "Outbound"
  );

  const allVariables = mockKeys.data.all_keys;

  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const taskEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef =
    React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    onSave({
      ...agent,
      name,
      description,
      prompt,
      task,
      first_message: firstMessage,
      direction,
      status,
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
        {/* Name */}
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

        {/* Description */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Description")}
          </Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("Placeholders.Description")}
          />
        </div>

        {/* Direction and Status */}
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
