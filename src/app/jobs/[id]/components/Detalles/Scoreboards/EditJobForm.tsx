"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil } from "lucide-react";

import {
  Scoreboard,
  ScoreboardEntry,
} from "@/app/jobs/[id]/types/ScoreboardsTypes";

interface EditJobFormProps {
  scoreboard: Scoreboard;
}

const EditJobForm: React.FC<EditJobFormProps> = ({ scoreboard }) => {
  const [publicChecked, setPublicChecked] = useState<boolean>(
    !!scoreboard.public
  );
  const [toCompleteChecked, setToCompleteChecked] = useState<boolean>(
    !!scoreboard.to_complete
  );

  const [entriesData, setEntriesData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    scoreboard.entries.forEach((entry) => {
      initialData[entry.id] = entry.value || getDefaultValue(entry.field_type);
    });
    return initialData;
  });

  function getDefaultValue(fieldType: string) {
    switch (fieldType) {
      case "checkbox":
        return false;
      default:
        return "";
    }
  }

  const handleChange = (id: string, value: any) => {
    setEntriesData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  function renderInput(entry: ScoreboardEntry) {
    const value = entriesData[entry.id];

    switch (entry.field_type) {
      case "textarea":
        return (
          <Textarea
            placeholder={entry.description}
            value={value}
            onChange={(e) => handleChange(entry.id, e.target.value)}
          />
        );

      case "datetime":
        return (
          <Input
            type="datetime-local"
            value={value}
            onChange={(e) => handleChange(entry.id, e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleChange(entry.id, e.target.value)}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={entry.id}
              checked={!!value}
              onCheckedChange={(checked) => handleChange(entry.id, !!checked)}
            />
            <label htmlFor={entry.id} className="text-sm font-medium">
              {entry.description}
            </label>
          </div>
        );

      case "select":
        // OJO: aquí necesitarás definir las opciones dinámicamente en el backend
        return (
          <select
            className="w-full border rounded px-3 py-2"
            value={value}
            onChange={(e) => handleChange(entry.id, e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="Option1">Opción 1</option>
            <option value="Option2">Opción 2</option>
          </select>
        );

      // FUTURO: soporta file, radio, etc.
      default:
        return (
          <Input
            type="text"
            placeholder={entry.description}
            value={value}
            onChange={(e) => handleChange(entry.id, e.target.value)}
          />
        );
    }
  }

  const handleSave = () => {
    console.log("✅ Public:", publicChecked);
    console.log("✅ To Complete:", toCompleteChecked);
    console.log("✅ Form Data:", entriesData);
    // Aquí haces POST o dispatch a tu API
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4 text-green-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Formulario</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={publicChecked}
              onCheckedChange={(checked) => setPublicChecked(!!checked)}
            />
            <label htmlFor="public" className="text-sm font-medium">
              Hacer público
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="toComplete"
              checked={toCompleteChecked}
              onCheckedChange={(checked) => setToCompleteChecked(!!checked)}
            />
            <label htmlFor="toComplete" className="text-sm font-medium">
              Pendiente de completar
            </label>
          </div>

          <h4 className="font-medium">Campos del formulario</h4>
          {scoreboard.entries.map((entry) => (
            <div key={entry.id} className="space-y-1">
              {entry.field_type !== "checkbox" && (
                <label className="text-sm font-medium">
                  {entry.field_name} *
                </label>
              )}
              {renderInput(entry)}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="secondary">Cancelar</Button>
          <Button
            variant="default"
            className="bg-purple-700 hover:bg-purple-800 text-white"
            onClick={handleSave}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobForm;
