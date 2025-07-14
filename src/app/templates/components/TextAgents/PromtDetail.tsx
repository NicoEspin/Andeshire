"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

interface PromtDetailProps {
  agentId: string;
  chatId: string;
  prompt: string;
  task: string;
  firstMessage: string;
}

export default function PromtDetail({
  agentId,
  chatId,
  prompt,
  task,
  firstMessage,
}: PromtDetailProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="hover:bg-muted cursor-pointer"
      >
        <Eye className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full min-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Prompt Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-muted-foreground">Agent ID:</p>
                <p className="truncate">{agentId}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Chat ID:</p>
                <p className="truncate">{chatId}</p>
              </div>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-1">First Message:</p>
              <div className="border rounded-md p-3 bg-muted/50 whitespace-pre-wrap">
                {firstMessage}
              </div>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-1">Task:</p>
              <div className="border rounded-md p-3 bg-muted/50 whitespace-pre-wrap">
                {task}
              </div>
            </div>

            <div>
              <p className="font-medium text-muted-foreground mb-1">Prompt:</p>
              <div className="border rounded-md p-3 bg-muted/50 whitespace-pre-wrap max-h-96 overflow-auto">
                {prompt}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
