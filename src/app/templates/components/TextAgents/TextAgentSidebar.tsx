"use client";

import * as React from "react";
import mockChat from "./data/chatmock.json";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MessageSquare } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface TextAgentSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TextAgentSidebar({
  open,
  onOpenChange,
}: TextAgentSidebarProps) {
  const t = useTranslations("Templates.TextAgents.TextAgentsSidebar");

  const agent = mockChat.agent;
  const messages = mockChat.messages.messages;

  const statusLabel =
    agent.status === "in_progress" ? t("StatusInProgress") : t("StatusDefault");

  const createdAtLabel = t("CreatedAt", {
    date: new Date(agent.created_at).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:min-w-[300px] md:min-w-[600px] border-l border-muted px-6 py-4"
      >
        <SheetHeader className="flex flex-row items-center gap-3 mb-4">
          <div className="rounded-full bg-purple-100 p-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <SheetTitle className="text-lg font-semibold">
              {t("Title", { id: agent.id })}
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              {t("ChatID", { chatId: agent.chat_id })}
            </SheetDescription>
            <span
              className={clsx(
                "inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 w-fit",
                agent.status === "in_progress"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {statusLabel}
            </span>
          </div>
        </SheetHeader>

        <div className="text-xs text-muted-foreground mb-4">
          {createdAtLabel}
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, idx) => {
            if (!msg.body?.trim()) return null;

            return (
              <div
                key={idx}
                className={clsx(
                  "relative max-w-[75%] p-3 rounded-xl shadow-sm",
                  msg.fromMe
                    ? "ml-auto bg-purple-600 text-white"
                    : "bg-muted border text-black"
                )}
              >
                <div
                  className={clsx(
                    "absolute top-2",
                    msg.fromMe
                      ? "-right-2 border-l-[8px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
                      : "-left-2 border-r-[8px] border-r-muted border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"
                  )}
                />
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {msg.body}
                </p>
                <p
                  className={clsx(
                    "mt-2 text-xs text-right",
                    msg.fromMe ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  {new Date(msg.timestamp * 1000).toLocaleTimeString(
                    undefined,
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          {/* Aquí puedes poner el input de respuesta o acciones futuras */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
