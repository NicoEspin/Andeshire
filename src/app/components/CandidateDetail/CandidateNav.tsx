"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Si usas ShadCN probablemente ya tienes esta función
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
  name: string;
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
  const tabs: Tab[] = [
    {
      name: "Resumen",
      icon: <FileText className="w-4 h-4" />,
      value: "summary",
    },
    {
      name: "Trabajos",
      icon: <Briefcase className="w-4 h-4" />,
      value: "jobs",
    },
    {
      name: "Matching",
      icon: <CheckCircle className="w-4 h-4" />,
      value: "matching",
    },
    {
      name: "Formularios",
      icon: <ClipboardList className="w-4 h-4" />,
      value: "forms",
    },
    {
      name: "Comentarios",
      icon: <MessageSquare className="w-4 h-4" />,
      value: "comments",
    },
    {
      name: "Reuniones",
      icon: <Calendar className="w-4 h-4" />,
      value: "meetings",
    },
    {
      name: "Personalizados",
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
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
