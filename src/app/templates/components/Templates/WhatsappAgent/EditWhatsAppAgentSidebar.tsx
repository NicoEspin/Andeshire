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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";

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
  const t = useTranslations(
    "Templates.TemplatesView.WhatsAppAgents.SidebarEdit"
  );

  const [name, setName] = React.useState(agent.name);
  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [task, setTask] = React.useState(agent.task);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);

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

        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Prompt")}
          </Label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder={t("Placeholders.Prompt")}
            className="whitespace-pre-wrap"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.Task")}
          </Label>
          <Textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows={4}
            placeholder={t("Placeholders.Task")}
            className="whitespace-pre-wrap"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-1 block">
            {t("Fields.FirstMessage")}
          </Label>
          <Textarea
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            rows={4}
            placeholder={t("Placeholders.FirstMessage")}
            className="whitespace-pre-wrap"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        <Button variant="outline" onClick={onCancel}>
          {t("Actions.Cancel")}
        </Button>
        <Button onClick={handleSave}>{t("Actions.Save")}</Button>
      </div>
    </SheetContent>
  );
}
