"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import type { HttpAgent } from "./HttpAgentsSidebar";

interface EditHttpAgentsSidebarProps {
  agent: HttpAgent;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditHttpAgentsSidebar({
  agent,
  onCancel,
  onSave,
}: EditHttpAgentsSidebarProps) {
  const t = useTranslations("Templates.TemplatesView.HTTPAgents.SidebarEdit");

  const [name, setName] = React.useState(agent.name);
  const [method, setMethod] = React.useState(agent.method);
  const [url, setUrl] = React.useState(agent.url);
  const [timeout, setTimeout] = React.useState(agent.timeout);
  const [retries, setRetries] = React.useState(agent.retries);
  const [requestBody, setRequestBody] = React.useState(agent.request_body);

  return (
    <SheetContent
      side="right"
      className="flex flex-col gap-6 sm:min-w-[300px] md:min-w-[600px] px-6 py-6"
    >
      <SheetHeader>
        <SheetTitle className="text-xl">{t("Title")}</SheetTitle>
      </SheetHeader>

      <div className="space-y-4 flex-grow">
        <div>
          <Label>{t("Fields.Name")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>{t("Fields.Method")}</Label>
          <Input value={method} onChange={(e) => setMethod(e.target.value)} />
        </div>
        <div>
          <Label>{t("Fields.URL")}</Label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <Label>{t("Fields.Timeout")}</Label>
          <Input
            type="number"
            value={timeout}
            onChange={(e) => setTimeout(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>{t("Fields.Retries")}</Label>
          <Input
            type="number"
            value={retries}
            onChange={(e) => setRetries(Number(e.target.value))}
          />
        </div>
        <div>
          <Label>{t("Fields.RequestBody")}</Label>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={6}
            className="w-full border rounded-md p-2"
          />
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
