"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MessageSquare, X, Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ActionChat() {
  const t = useTranslations("CandidateDetail.CandidateActions.ActionChat");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    console.log("Mensaje enviado:", message);
    setMessage("");
  };

  return (
    <>
      {/* Botón de Chat */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-green-100 hover:text-green-700"
      >
        <MessageSquare className="w-4 h-4" />
        {t("Button")}
      </Button>

      {/* Drawer del Chat */}
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="w-full max-w-xs p-0 rounded-t-lg shadow-lg border bg-white fixed bottom-20 right-6">
          <div className="flex flex-col h-full rounded-lg overflow-auto">
            {/* Header */}
            <div className="bg-green-600 text-white p-3 flex items-center justify-between">
              <DrawerTitle className="font-semibold text-white">
                {t("Title")}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-green-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </DrawerClose>
            </div>

            {/* Mensajes */}
            <div className="flex-1 flex flex-col justify-center items-center text-center text-gray-500 p-4">
              <p className="text-lg mb-2">{t("NoMessagesTitle")}</p>
              <p className="text-sm">{t("NoMessagesDescription")}</p>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("Placeholder")}
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
