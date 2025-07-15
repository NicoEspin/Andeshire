"use client";

import * as React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/ui/badge";
import { useKeyMetaMap } from "@/lib/keys/useKeyMetaMap";
import { extractKeysFromContent } from "@/lib/keys/extractKeysFromContent";
import mockKeys from "../../data/mockkeys.json";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

interface EmailSidebarEditProps {
  template: { name: string; subject: string; content: string };
  onCancel: () => void;
  onSave: () => void;
}

export default function EmailSidebarEdit({
  template,
  onCancel,
  onSave,
}: EmailSidebarEditProps) {
  const t = useTranslations(
    "Templates.TemplatesView.Email.SidebarEdit"
  );

  const [name, setName] = React.useState<string>(template.name);
  const [subject, setSubject] = React.useState<string>(template.subject);
  const [content, setContent] = React.useState<string>(template.content);

  const subjectRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLTextAreaElement>(null);

  const [activeField, setActiveField] = React.useState<"subject" | "content" | null>(null);

  const allVariables: string[] = mockKeys.data.all_keys;
  const allKeysMap = useKeyMetaMap(allVariables.map((key) => ({ key })));

  const subjectKeys = extractKeysFromContent(subject).map((key) => ({ key }));
  const contentKeys = extractKeysFromContent(content).map((key) => ({ key }));

  const subjectKeyMetaMap = useKeyMetaMap(subjectKeys);
  const contentKeyMetaMap = useKeyMetaMap(contentKeys);

  const handleInsertVariable = (variable: string) => {
    if (activeField === "subject" && subjectRef.current) {
      const input = subjectRef.current;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;

      const before = subject.substring(0, start);
      const after = subject.substring(end);

      const insertText = `{{${variable}}}`;
      const newSubject = before + insertText + after;
      setSubject(newSubject);

      requestAnimationFrame(() => {
        input.focus();
        const newCursorPos = start + insertText.length;
        input.setSelectionRange(newCursorPos, newCursorPos);
      });
    } else if (activeField === "content" && contentRef.current) {
      const textarea = contentRef.current;
      const start = textarea.selectionStart ?? 0;
      const end = textarea.selectionEnd ?? 0;

      const before = content.substring(0, start);
      const after = content.substring(end);

      const insertText = `{{${variable}}}`;
      const newContent = before + insertText + after;
      setContent(newContent);

      requestAnimationFrame(() => {
        textarea.focus();
        const newCursorPos = start + insertText.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      });
    }
  };

  const renderContentWithBadges = (
    value: string,
    keyMetaMap: Record<string, any>
  ) => {
    const regex = /{{(.*?)}}/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let i = 0;

    while ((match = regex.exec(value)) !== null) {
      const before = value.substring(lastIndex, match.index);
      if (before) {
        parts.push(<span key={`text-${i}`}>{before}</span>);
        i++;
      }

      const key = match[1].trim();
      const meta = keyMetaMap[key];

      if (meta) {
        parts.push(
          <Badge
            key={`badge-${key}-${i}`}
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
        parts.push(<span key={`unknown-${key}-${i}`}>{`{{${key}}}`}</span>);
      }

      lastIndex = regex.lastIndex;
      i++;
    }

    const after = value.substring(lastIndex);
    if (after) {
      parts.push(<span key={`text-after-${i}`}>{after}</span>);
    }

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
          <Label>{t("TemplateName")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Label>{t("Subject")}</Label>
          <Input
            ref={subjectRef}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onFocus={() => setActiveField("subject")}
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {t("SelectVariable")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {allVariables.map((v) => {
                  const meta = allKeysMap[v];
                  if (!meta) return null;

                  return (
                    <DropdownMenuItem
                      key={v}
                      onSelect={() => handleInsertVariable(v)}
                      className="flex items-center"
                    >
                      <Badge
                        style={{
                          backgroundColor: meta.color,
                          color: "#fff",
                          margin: "0",
                        }}
                      >
                        {meta.label}
                      </Badge>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <Label>{t("Content")}</Label>
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setActiveField("content")}
            rows={6}
            className="w-full border rounded-md p-2"
          />
          <div className="mt-2">
            <Label className="block mb-1">{t("AddVariable")}</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {t("SelectVariable")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {allVariables.map((v) => {
                  const meta = allKeysMap[v];
                  if (!meta) return null;

                  return (
                    <DropdownMenuItem
                      key={v}
                      onSelect={() => handleInsertVariable(v)}
                      className="flex items-center"
                    >
                      <Badge
                        style={{
                          backgroundColor: meta.color,
                          color: "#fff",
                          margin: "0",
                        }}
                      >
                        {meta.label}
                      </Badge>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <Label>{t("PreviewSubject")}</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderContentWithBadges(subject, subjectKeyMetaMap)}
          </div>
        </div>

        <div>
          <Label>{t("PreviewContent")}</Label>
          <div className="border rounded-md p-4 text-sm whitespace-pre-wrap">
            {renderContentWithBadges(content, contentKeyMetaMap)}
          </div>
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
