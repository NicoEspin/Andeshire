"use client";

import { Button } from "@/app/components/ui/button";
import {
  Link,
  MessageCircle,
  Edit,
  GitCompare,
  RefreshCw,
  Settings,
  X,
  ChevronRight,
  Home,
} from "lucide-react";
import { useState } from "react";

interface CandidateToolbarProps {
  onVincular?: () => void;
  onChat?: () => void;
  onEditar?: () => void;
  onComparar?: () => void;
  onActualizar?: () => void;
  onGenerar?: () => void;
  onClose?: () => void;
}

export function CandidateToolbar({
  onVincular,
  onChat,
  onEditar,
  onComparar,
  onActualizar,
  onGenerar,
  onClose,
}: CandidateToolbarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleActualizar = async () => {
    setIsRefreshing(true);
    if (onActualizar) {
      await onActualizar();
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toolbarButtons = [
    {
      id: "vincular",
      label: "Vincular",
      icon: Link,
      onClick: onVincular,
      variant: "outline" as const,
      className:
        "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200",
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle,
      onClick: onChat,
      variant: "outline" as const,
      className:
        "hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-all duration-200",
    },
    {
      id: "editar",
      label: "Editar",
      icon: Edit,
      onClick: onEditar,
      variant: "outline" as const,
      className:
        "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 transition-all duration-200",
    },
    {
      id: "comparar",
      label: "Comparar",
      icon: GitCompare,
      onClick: onComparar,
      variant: "outline" as const,
      className:
        "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all duration-200",
    },
    {
      id: "actualizar",
      label: "Actualizar",
      icon: RefreshCw,
      onClick: handleActualizar,
      variant: "outline" as const,
      className:
        "hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-all duration-200",
      isLoading: isRefreshing,
    },
    {
      id: "generar",
      label: "Generar",
      icon: Settings,
      onClick: onGenerar,
      variant: "outline" as const,
      className:
        "hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 transition-all duration-200",
    },
  ];

  return (
    <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-sm animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
        <Home className="h-4 w-4 text-gray-500 animate-in zoom-in-0 duration-300 delay-200" />
        <button className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105">
          Dashboard
        </button>
        <ChevronRight className="h-4 w-4 text-gray-400 animate-in fade-in-0 duration-300 delay-300" />
        <button className="text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105">
          Candidatos
        </button>
        <ChevronRight className="h-4 w-4 text-gray-400 animate-in fade-in-0 duration-300 delay-400" />
        <span className="text-gray-900 font-medium animate-in fade-in-0 slide-in-from-right-2 duration-500 delay-500">
          Julián Bracamonte
        </span>
      </div>

      {/* Existing Toolbar */}
      <div className="flex items-center gap-2 p-4 bg-white border-b border-gray-200 shadow-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
        <div className="flex items-center gap-2 flex-1">
          {toolbarButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <Button
                key={button.id}
                variant={button.variant}
                size="sm"
                onClick={button.onClick}
                disabled={button.isLoading}
                className={`
                flex items-center gap-2 px-3 py-2 text-sm font-medium
                bg-white text-gray-700 border border-gray-300 rounded-md
                hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5
                active:scale-95 active:shadow-sm active:translate-y-0
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-200 ease-out
                animate-in fade-in-0 slide-in-from-bottom-2
                ${button.className}
              `}
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    button.isLoading ? "animate-spin" : "group-hover:scale-110"
                  }`}
                />
                {button.label}
              </Button>
            );
          })}
        </div>

        {/* Close button */}
        {onClose && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="
            flex items-center justify-center p-2 ml-2
            bg-white text-red-600 border border-red-300 rounded-md
            hover:bg-red-50 hover:text-red-700 hover:border-red-400
            hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5
            active:scale-95 active:shadow-sm active:translate-y-0
            transition-all duration-200 ease-out
            animate-in fade-in-0 zoom-in-0 duration-500 delay-700
          "
          >
            <X className="h-4 w-4 transition-transform duration-200 hover:rotate-90" />
          </Button>
        )}
      </div>
    </div>
  );
}
