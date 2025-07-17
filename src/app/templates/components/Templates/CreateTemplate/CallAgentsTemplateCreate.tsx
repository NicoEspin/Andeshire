"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  const t = useTranslations("Templates.TemplatesView.CallAgents.Create");

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [firstMessage, setFirstMessage] = React.useState("");
  const [maxAttempts, setMaxAttempts] = React.useState(0);
  const [intervalMinutes, setIntervalMinutes] = React.useState(0);
  const [askPermission, setAskPermission] = React.useState(true);
  const [direction, setDirection] = React.useState("Outbound");
  const [status, setStatus] = React.useState("Active");

  const allVariables = mockKeys.data.all_keys;
  const promptEditorRef = React.useRef<VariableRichTextEditorHandle>(null);
  const firstMessageEditorRef =
    React.useRef<VariableRichTextEditorHandle>(null);

  const handleSave = () => {
    onSave?.({
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

        <div>
          <Label className="block mb-1">{t("Description")}</Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2 min-h-[80px]"
          />
        </div>

        <div className="flex gap-6">
          <div>
            <Label className="text-sm font-medium mb-1 block">
              {t("Direction")}
            </Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger>
                <SelectValue placeholder={t("Direction")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Outbound">
                  {t("DirectionOptions.Outbound")}
                </SelectItem>
                <SelectItem value="Inbound">
                  {t("DirectionOptions.Inbound")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">
              {t("Status")}
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder={t("Status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">
                  {t("StatusOptions.Active")}
                </SelectItem>
                <SelectItem value="Inactive">
                  {t("StatusOptions.Inactive")}
                </SelectItem>
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
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={promptEditorRef}
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
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <VariableDropdown
              allVariables={allVariables}
              editorRef={firstMessageEditorRef}
            />
          </div>
        </div>

        <div>
          <Label className="block mb-1">{t("MaxAttempts")}</Label>
          <Input
            type="number"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
          />
        </div>

        <div>
          <Label className="block mb-1">{t("IntervalMinutes")}</Label>
          <Input
            type="number"
            value={intervalMinutes}
            onChange={(e) => setIntervalMinutes(Number(e.target.value))}
          />
        </div>

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
