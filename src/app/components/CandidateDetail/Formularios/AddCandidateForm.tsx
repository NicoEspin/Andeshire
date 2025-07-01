"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddCandidateFormProps = {
  templates: { id: string; name: string }[];
};

export default function AddCandidateForm({ templates }: AddCandidateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [isPublic, setIsPublic] = React.useState(false);
  const [toComplete, setToComplete] = React.useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 text-white hover:bg-purple-800">
          <Plus className="w-4 h-4 mr-2" />
          Crear Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Formulario</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="template">Selecciona una plantilla</Label>
            <Select onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template" className="w-full mt-2">
                <SelectValue placeholder="Selecciona una plantilla..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="public" checked={isPublic} onCheckedChange={(checked) => setIsPublic(!!checked)} />
            <Label htmlFor="public">Hacer público</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="toComplete" checked={toComplete} onCheckedChange={(checked) => setToComplete(!!checked)} />
            <Label htmlFor="toComplete">Pendiente de completar</Label>
          </div>

          <div>
            <h3 className="font-semibold">Campos del formulario</h3>
            {/* Aquí puedes renderizar dinámicamente campos adicionales si es necesario */}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-purple-700 text-white hover:bg-purple-800">Guardar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
