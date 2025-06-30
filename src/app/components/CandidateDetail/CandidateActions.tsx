"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Link,
  MessageSquare,
  Pencil,
  RefreshCcw,
  Settings,
  ArrowLeftRight,
} from "lucide-react";

interface CandidateActionsProps {
  onClose: () => void;
}

export default function CandidateActions({ onClose }: CandidateActionsProps) {
  // 👉 Escuchar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-red-700"
        >
          <X className="w-4 h-4" />
          Rechazar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-blue-100 hover:text-blue-700"
        >
          <Link className="w-4 h-4" />
          Vincular
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-green-100 hover:text-green-700"
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-yellow-100 hover:text-yellow-700"
        >
          <Pencil className="w-4 h-4" />
          Editar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-purple-100 hover:text-purple-700"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Comparar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-indigo-100 hover:text-indigo-700"
        >
          <RefreshCcw className="w-4 h-4" />
          Actualizar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-gray-200 hover:text-gray-800"
        >
          <Settings className="w-4 h-4" />
          Generar
        </Button>
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={onClose}
        className="cursor-pointer transition-colors hover:bg-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
