"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import EmailsSidebarView from "./EmailsSidebarView";
import EmailsSidebarEdit from "./EmailsSidebarEdit";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
  recruiter?: string;
}

interface EmailsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: EmailTemplate | null;
}

export default function EmailsSidebar({
  open,
  onOpenChange,
  template,
}: EmailsSidebarProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  if (!template) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {isEditing ? (
        <EmailsSidebarEdit
          template={template}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <EmailsSidebarView
          template={template}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
