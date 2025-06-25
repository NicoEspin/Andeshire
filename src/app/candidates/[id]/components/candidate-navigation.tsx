"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  User,
  FileText,
  MessageSquare,
  Folder,
  Shield,
  Calendar,
} from "lucide-react";
import type { Candidate } from "../types/candidate";

interface CandidateNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  candidate: Candidate;
}

export function CandidateNavigation({
  activeSection,
  onSectionChange,
  candidate,
}: CandidateNavigationProps) {
  const navigationItems = [
    {
      id: "perfil",
      label: "Perfil",
      icon: User,
    },
    {
      id: "formularios",
      label: "Formularios",
      icon: FileText,
      badge: candidate.scoreboards.some((sb) => sb.to_complete) ? "!" : null,
    },
    {
      id: "comentarios",
      label: "Comentarios",
      icon: MessageSquare,
    },
    {
      id: "heimdall",
      label: "Heimdall",
      icon: Shield,
    },
    {
      id: "reuniones",
      label: "Reuniones",
      icon: Calendar,
    },
    {
      id: "archivos",
      label: "Archivos",
      icon: Folder,
      badge: candidate.files.length.toString(),
    },
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-10 animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-200">
      <div className="flex space-x-8 px-6">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              data-driver-id={item.id}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ease-out hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 ${
                isActive
                  ? "border-blue-500 text-blue-600 shadow-sm"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                {item.label}
                {item.badge && (
                  <Badge
                    variant={item.badge === "!" ? "destructive" : "outline"}
                    className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
