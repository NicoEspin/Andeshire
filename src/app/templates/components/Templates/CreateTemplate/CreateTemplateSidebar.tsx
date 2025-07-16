"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import WhatsappTemplateCreate from "./WhatsappTemplateCreate";
import EmailTemplateCreate from "./EmailTemplateCreate";
import EmailAgentsTemplateCreate from "./EmailAgentsTemplateCreate";

// ...otros imports según tu estructura

const CREATE_COMPONENTS: { [key: string]: React.FC<{ onCancel: () => void }> } =
  {
    WhatsApp: WhatsappTemplateCreate,
    Email: EmailTemplateCreate,
    EmailAgents: EmailAgentsTemplateCreate,
    // agrega tus otros tipos aquí
  };

interface CreateTemplateSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateTemplateSidebar({
  open,
  onOpenChange,
}: CreateTemplateSidebarProps) {
  const searchParams = useSearchParams();
  const subtab = searchParams.get("subtab") || "WhatsApp";
  const Component = CREATE_COMPONENTS[subtab];

  if (!Component) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <Component onCancel={() => onOpenChange(false)} />
    </Sheet>
  );
}
