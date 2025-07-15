"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { CallAgent } from "./CallAgentsSidebar";

interface EditProps {
  agent: CallAgent;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditCallAgentsSidebar({
  agent,
  onCancel,
  onSave,
}: EditProps) {
  const t = useTranslations("Templates.TemplatesView.CallAgents.SidebarEdit");

  const [name, setName] = React.useState(agent.name);
  const [prompt, setPrompt] = React.useState(agent.prompt);
  const [firstMessage, setFirstMessage] = React.useState(agent.first_message);
  const [maxAttempts, setMaxAttempts] = React.useState(agent.max_attempts);
  const [intervalMinutes, setIntervalMinutes] = React.useState(
    agent.interval_minutes
  );
  const [askPermission, setAskPermission] = React.useState(
    agent.ask_permission
  );

  return (
    <SheetContent
      side="right"
      className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] px-6 py-6 gap-4 overflow-auto"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-4 flex-grow">
        <div>
          <Label>{t("Name")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Label>{t("Prompt")}</Label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <Label>{t("FirstMessage")}</Label>
          <textarea
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            rows={4}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <Label>{t("MaxAttempts")}</Label>
          <Input
            type="number"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>{t("IntervalMinutes")}</Label>
          <Input
            type="number"
            value={intervalMinutes}
            onChange={(e) => setIntervalMinutes(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>
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
