"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function AddCandidateTags() {
  const [open, setOpen] = React.useState(false);

  // Aquí podrías manejar la lógica para buscar o filtrar tags
  const availableTags = ["ALTA ROTACIÓN", "ROTACIÓN NORMAL", "PROSPECTO"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Añadir tag
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Seleccionar Tag</DialogTitle>
        </DialogHeader>
        <Input placeholder="Buscar tags..." />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="flex justify-between"
            >
              <span>{tag}</span>
              <Plus className="w-4 h-4" />
            </Button>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={() => setOpen(false)}
          className="mt-4 w-full"
        >
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
