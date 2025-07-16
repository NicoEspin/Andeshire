"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import WhatsappSidebarView from "./WhatsappSidebarView";
import WhatsappSidebarEdit from "./WhatsappSidebarEdit";

interface WhatsappSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: {
    id: string;
    name: string;
    content: string;
    created_at: string;
    updated_at: string;
    recruiter: string;
  } | null;
  mode: "view" | "edit";
}

export default function WhatsappSidebar({
  open,
  onOpenChange,
  template,
  mode,
}: WhatsappSidebarProps) {
  const [isEditing, setIsEditing] = React.useState(false);

   React.useEffect(() => {
    if (open) {
      setIsEditing(mode === "edit");
    } else {
      setIsEditing(false);
    }
  }, [open, mode]);

  if (!template) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {isEditing ? (
        <WhatsappSidebarEdit
          template={template}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <WhatsappSidebarView
          template={template}
          onEdit={() => setIsEditing(true)}
          onClose={() => onOpenChange(false)}
        />
      )}
    </Sheet>
  );
}
