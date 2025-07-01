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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { Plus } from "lucide-react";

export default function AddCandidateMeet() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón para abrir */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border text-white bg-purple-700 hover:bg-purple-800 hover:text-white"
        >
          <Plus className="w-4 h-4" />
          Añadir reunión
        </Button>
      </DialogTrigger>

      {/* Contenido del modal */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Añadi una nueva reunión</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Título */}
          <div>
            <Label htmlFor="summary">Título de la meet</Label>
            <Input id="summary" placeholder="Título" />
          </div>

          {/* Fechas */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="start">Fecha de inicio</Label>
              <Input type="datetime-local" id="start" />
            </div>
            <div className="flex-1">
              <Label htmlFor="end">Fecha de finalización</Label>
              <Input type="datetime-local" id="end" />
            </div>
          </div>

          {/* Participantes */}
          <div>
            <Label htmlFor="participants">
              Participantes (separados por coma)
            </Label>
            <Input
              id="participants"
              placeholder="email1@example.com, email2@example.com"
            />
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Detalles de la reunión" />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button className="bg-purple-700 text-white hover:bg-purple-800">
            Programar Reunión
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
