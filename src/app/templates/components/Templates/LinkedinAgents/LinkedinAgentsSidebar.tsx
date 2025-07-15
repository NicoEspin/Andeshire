"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import ViewLinkedinAgentsSidebar from "./ViewLinkedinAgentsSidebar";
import EditLinkedinAgentsSidebar from "./EditLinkedinAgentsSidebar";

export interface LinkedinAgent {
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

interface LinkedinAgentsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: LinkedinAgent | null;
}

export default function LinkedinAgentsSidebar({
  open,
  onOpenChange,
  agent,
}: LinkedinAgentsSidebarProps) {
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
        <EditLinkedinAgentsSidebar
          agent={agent}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <ViewLinkedinAgentsSidebar
          agent={agent}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
