"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import mockKeys from "../../data/mockkeys.json";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface EmailAgent {
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

interface EditEmailAgentsSidebarProps {
  agent: EmailAgent;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditEmailAgentsSidebar({
  agent,
  onCancel,
  onSave,
}: EditEmailAgentsSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.EmailAgents.SidebarEdit");

  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [task, setTask] = React.useState(agent.task);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);

  const allVariables: string[] = mockKeys.data.all_keys;
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  const handleInsertVariable = (
    field: "prompt" | "task" | "firstMessage",
    variable: string
  ) => {
    const insertText = `{{${variable}}}`;
    if (field === "prompt") setPrompt((prev) => prev + insertText);
    if (field === "task") setTask((prev) => prev + insertText);
    if (field === "firstMessage") setFirstMessage((prev) => prev + insertText);
  };

  const renderWithBadges = (text: string) => {
    const regex = /{{(.*?)}}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let i = 0;

    while ((match = regex.exec(text)) !== null) {
      const before = text.substring(lastIndex, match.index);
      if (before) {
        parts.push(<span key={`text-${i}`}>{before}</span>);
        i++;
      }

      const keyName = match[1].trim();
      const meta = allKeysMap[keyName];

      if (meta) {
        parts.push(
          <Badge
            key={`badge-${keyName}-${match.index}-${i}`}
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
          <span key={`unknown-${keyName}-${match.index}-${i}`}>{`{{${keyName}}}`}</span>
        );
      }

      lastIndex = regex.lastIndex;
      i++;
    }

    const after = text.substring(lastIndex);
    if (after) {
      parts.push(<span key={`text-after-${i}`}>{after}</span>);
    }

    return parts;
  };

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="space-y-4 flex-grow">
        <div>
          <Label>{t("PromptLabel")}</Label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full border rounded-md p-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mt-2">
                {t("AddVariable")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allVariables.map((v) => (
                <DropdownMenuItem
                  key={v}
                  onSelect={() => handleInsertVariable("prompt", v)}
                >
                  {v}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="border p-2 rounded mt-2">{renderWithBadges(prompt)}</div>
        </div>

        <div>
          <Label>{t("TaskLabel")}</Label>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={4}
            className="w-full border rounded-md p-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mt-2">
                {t("AddVariable")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allVariables.map((v) => (
                <DropdownMenuItem
                  key={v}
                  onSelect={() => handleInsertVariable("task", v)}
                >
                  {v}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="border p-2 rounded mt-2">{renderWithBadges(task)}</div>
        </div>

        <div>
          <Label>{t("FirstMessageLabel")}</Label>
          <textarea
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            rows={4}
            className="w-full border rounded-md p-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mt-2">
                {t("AddVariable")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {allVariables.map((v) => (
                <DropdownMenuItem
                  key={v}
                  onSelect={() => handleInsertVariable("firstMessage", v)}
                >
                  {v}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="border p-2 rounded mt-2">{renderWithBadges(firstMessage)}</div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="secondary" onClick={onSave}>
          {t("Save")}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {t("Cancel")}
        </Button>
      </div>
    </SheetContent>
  );
}
