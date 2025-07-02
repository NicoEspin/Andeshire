"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RefreshCcw,
  Linkedin,
  FileText,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

export default function ActionUpdate() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-indigo-100 hover:text-indigo-700"
        >
          <RefreshCcw className="w-4 h-4" />
          Actualizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Opciones de Actualización
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Button className="w-full flex gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            <Linkedin className="w-4 h-4" />
            Actualizar por LinkedIn
          </Button>
          <Button className="w-full flex gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer">
            <FileText className="w-4 h-4" />
            Actualizar por CV
          </Button>
          <Button className="w-full flex gap-2 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
            <Briefcase className="w-4 h-4" />
            Actualizar por Experiencia
          </Button>
          <Button
            variant="secondary"
            className="w-full flex gap-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
