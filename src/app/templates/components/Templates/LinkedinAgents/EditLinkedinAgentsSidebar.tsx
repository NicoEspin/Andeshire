"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import mockKeys from "../../data/mockkeys.json";
import { LinkedinAgent } from "./LinkedinAgentsSidebar";

interface EditLinkedinAgentsSidebarProps {
  agent: LinkedinAgent;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditLinkedinAgentsSidebar({
  agent,
  onCancel,
  onSave,
}: EditLinkedinAgentsSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.LinkedinAgents.SidebarEdit");

  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [task, setTask] = React.useState(agent.task);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);

  const [activeField, setActiveField] = React.useState<
    "prompt" | "task" | "firstMessage" | null
  >(null);

  const promptRef = React.useRef<HTMLTextAreaElement>(null);
  const taskRef = React.useRef<HTMLTextAreaElement>(null);
  const firstMessageRef = React.useRef<HTMLTextAreaElement>(null);

  const allVariables: string[] = mockKeys.data.all_keys;
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  const handleInsertVariable = (variable: string) => {
    const insertText = `{{${variable}}}`;
    const insertIntoField = (
      value: string,
      ref: React.RefObject<HTMLTextAreaElement>,
      setter: (v: string) => void
    ) => {
      if (ref.current) {
        const start = ref.current.selectionStart ?? 0;
        const end = ref.current.selectionEnd ?? 0;
        const before = value.substring(0, start);
        const after = value.substring(end);
        setter(before + insertText + after);

        requestAnimationFrame(() => {
          ref.current?.focus();
          const newCursorPos = start + insertText.length;
          ref.current?.setSelectionRange(newCursorPos, newCursorPos);
        });
      }
    };

    if (activeField === "prompt") {
      insertIntoField(prompt, promptRef, setPrompt);
    } else if (activeField === "task") {
      insertIntoField(task, taskRef, setTask);
    } else if (activeField === "firstMessage") {
      insertIntoField(firstMessage, firstMessageRef, setFirstMessage);
    }
  };

  const renderWithBadges = (text: string) => {
    const keys = extractKeysFromContent(text).map((key) => ({ key }));
    const keyMetaMap = useKeyMetaMap(keys);

    const regex = /{{(.*?)}}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const before = text.substring(lastIndex, match.index);
      if (before) parts.push(<span key={`before-${lastIndex}`}>{before}</span>);

      const keyName = match[1].trim();
      const meta = keyMetaMap[keyName];

      if (meta) {
        parts.push(
          <Badge
            key={keyName}
            style={{
              backgroundColor: meta.color,
              color: "#fff",
              margin: "0 2px",
            }}
          >
            {meta.label}
          </Badge>
        );
      } else {
        parts.push(
          <span key={`missing-${keyName}`}>{`{{${keyName}}}`}</span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    const after = text.substring(lastIndex);
    if (after) parts.push(<span key={`after-${lastIndex}`}>{after}</span>);

    return parts;
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <Label>{t("Fields.Prompt")}</Label>
          <textarea
            ref={promptRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setActiveField("prompt")}
            rows={4}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <Label>{t("Fields.Task")}</Label>
          <textarea
            ref={taskRef}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onFocus={() => setActiveField("task")}
            rows={4}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <Label>{t("Fields.FirstMessage")}</Label>
          <textarea
            ref={firstMessageRef}
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            onFocus={() => setActiveField("firstMessage")}
            rows={4}
            className="w-full border rounded-md p-2"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{t("Fields.AddVariable")}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allVariables.map((v) => (
              <DropdownMenuItem
                key={v}
                onSelect={() => handleInsertVariable(v)}
              >
                {v}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <Label>{t("Fields.PreviewPrompt")}</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderWithBadges(prompt)}
          </div>
        </div>

        <div>
          <Label>{t("Fields.PreviewTask")}</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderWithBadges(task)}
          </div>
        </div>

        <div>
          <Label>{t("Fields.PreviewFirstMessage")}</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderWithBadges(firstMessage)}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="secondary" onClick={onSave}>
          {t("Actions.Save")}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {t("Actions.Cancel")}
        </Button>
      </div>
    </SheetContent>
  );
}
