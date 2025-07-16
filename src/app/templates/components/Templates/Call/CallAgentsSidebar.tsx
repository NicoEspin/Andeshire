"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import ViewCallAgentsSidebar from "./ViewCallAgentsSidebar";
import EditCallAgentsSidebar from "./EditCallAgentsSidebar";

export interface CallAgent {
  id: string;
  name: string;
  prompt: string;
  description: string;
  first_message: string;
  max_attempts: number;
  interval_minutes: number;
  ask_permission: boolean;
  created_at: string;
  updated_at: string;
}

interface CallAgentsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: CallAgent | null;
}

export default function CallAgentsSidebar({
  open,
  onOpenChange,
  agent,
}: CallAgentsSidebarProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!open) setIsEditing(false);
  }, [open]);

  if (!agent) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {isEditing ? (
        <EditCallAgentsSidebar
          agent={agent}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <ViewCallAgentsSidebar
          agent={agent}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
