"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import ViewEmailAgentsSidebar from "./ViewEmailAgentsSidebar";
import EditEmailAgentsSidebar from "./EditEmailAgentsSidebar";

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

interface EmailAgentsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: EmailAgent | null;
}

export default function EmailAgentsSidebar({
  open,
  onOpenChange,
  agent,
}: EmailAgentsSidebarProps) {
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
        <EditEmailAgentsSidebar
          agent={agent}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <ViewEmailAgentsSidebar
          agent={agent}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
