"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import ViewHttpAgentsSidebar from "./ViewHttpAgentsSidebar";
import EditHttpAgentsSidebar from "./EditHttpAgentsSidebar";

export interface HttpAgent {
  id: string;
  name: string;
  method: string;
  url: string;
  save_output: string[];
  query_params: Record<string, string>;
  headers: Record<string, string>;
  timeout: number;
  retries: number;
  request_body: string;
  created_at: string;
  updated_at: string;
}

interface HttpAgentsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: HttpAgent | null;
}

export default function HttpAgentsSidebar({
  open,
  onOpenChange,
  agent,
}: HttpAgentsSidebarProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!open) setIsEditing(false);
  }, [open]);

  if (!agent) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {isEditing ? (
        <EditHttpAgentsSidebar
          agent={agent}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <ViewHttpAgentsSidebar
          agent={agent}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
