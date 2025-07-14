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
}

export default function WhatsappSidebar({
  open,
  onOpenChange,
  template,
}: WhatsappSidebarProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setIsEditing(false); // 🧹 Limpiar estado al cerrar
    }
  }, [open]);

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
