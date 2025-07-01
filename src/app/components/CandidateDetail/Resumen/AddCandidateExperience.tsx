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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function AddCandidateExperience() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Experiencia
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Agregar Experiencia
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Empresa</label>
            <Input placeholder="Nombre de la empresa" />
          </div>
          <div>
            <label className="block text-sm font-medium">Cargo</label>
            <Input placeholder="Título del puesto" />
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha de Inicio</label>
            <Input type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha de Fin</label>
            <Input type="date" />
            <p className="text-xs text-gray-500">
              Dejar vacío si es trabajo actual
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <Textarea placeholder="Detalles del rol, logros, responsabilidades..." />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
