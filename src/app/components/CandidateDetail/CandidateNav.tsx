"use client";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Briefcase,
  CheckCircle,
  ClipboardList,
  MessageSquare,
  Calendar,
  Settings2,
} from "lucide-react";

interface Tab {
  nameKey: string; // Ahora usamos clave de traducción
  icon: ReactNode;
  value: string;
}

interface CandidateNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CandidateNav({
  activeTab,
  setActiveTab,
}: CandidateNavProps) {
  const t = useTranslations("CandidateDetail.Nav");

  const tabs: Tab[] = [
    {
      nameKey: "Summary",
      icon: <FileText className="w-4 h-4" />,
      value: "summary",
    },
    { nameKey: "Jobs", icon: <Briefcase className="w-4 h-4" />, value: "jobs" },
    {
      nameKey: "Matching",
      icon: <CheckCircle className="w-4 h-4" />,
      value: "matching",
    },
    {
      nameKey: "Forms",
      icon: <ClipboardList className="w-4 h-4" />,
      value: "forms",
    },
    {
      nameKey: "Comments",
      icon: <MessageSquare className="w-4 h-4" />,
      value: "comments",
    },
    {
      nameKey: "Meetings",
      icon: <Calendar className="w-4 h-4" />,
      value: "meetings",
    },
    {
      nameKey: "Custom",
      icon: <Settings2 className="w-4 h-4" />,
      value: "custom",
    },
  ];

  return (
    <div className="flex space-x-6 border-b px-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={cn(
            "flex items-center gap-1 pb-2 border-b-2 -mb-px text-sm font-medium transition-colors",
            activeTab === tab.value
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-primary"
          )}
        >
          {tab.icon}
          <span>{t(tab.nameKey)}</span>
        </button>
      ))}
    </div>
  );
}
