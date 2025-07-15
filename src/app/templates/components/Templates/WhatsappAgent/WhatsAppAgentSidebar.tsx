"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import ViewWhatsAppAgentSidebar from "./ViewWhatsAppAgentSidebar";
import EditWhatsAppAgentSidebar from "./EditWhatsAppAgentSidebar";

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

interface WhatsAppAgentSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: WhatsAppAgent | null;
}

export default function WhatsAppAgentSidebar({
  open,
  onOpenChange,
  agent,
}: WhatsAppAgentSidebarProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  if (!agent) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {isEditing ? (
        <EditWhatsAppAgentSidebar
          agent={agent}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <ViewWhatsAppAgentSidebar
          agent={agent}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
