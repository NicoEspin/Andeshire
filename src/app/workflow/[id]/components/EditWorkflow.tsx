"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MultiSelect } from "@/components/ui/multiselect"; // Ajusta a tu versión real
import { Separator } from "@/components/ui/separator"; // Opcional para separadores

type EditWorkflowProps = {
  stage: {
    id: string;
    label: string;
    description?: string;
    actions?: { id: string; action_type: string }[];
    statusOptions?: string[];
    color: string;
  };
};

const STATUS_OPTIONS = [
  "Activo",
  "Inactivo",
  "Paso Inicial",
  "🤖 Piloto Automatico Heimdall",
  "🚗 Piloto Automatico Agente",
  "En Proceso",
  "Rechazado",
];

const ACTION_OPTIONS = [
  "Email",
  "Agente de voz",
  "WhatsApp",
  "Agente de WhatsApp",
  "Formulario",
];

export function EditWorkflow({ stage }: EditWorkflowProps) {
  const [label, setLabel] = React.useState(stage.label);
  const [description, setDescription] = React.useState(stage.description || "");
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>(
    stage.statusOptions || []
  );
  const [actions, setActions] = React.useState(stage.actions || []);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const addAction = (actionType: string) => {
    setActions((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        action_type: actionType,
      },
    ]);
  };

  const handleSave = () => {
    console.log({
      label,
      description,
      statuses: selectedStatuses,
      actions,
    });
    // 🔗 Aquí conecta con tu lógica de persistencia o API.
  };

  const handleCancel = () => {
    // Si quieres cerrar el Sheet, deberías manejarlo con estado externo.
    console.log("Cancelado");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          style={{ borderColor: stage.color }}
          className="w-full border-2 hover:scale-[1.02] transition-transform cursor-pointer"
        >
          Editar Stage
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] p-6 flex flex-col gap-6 bg-background"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-bold mb-2">
            Editar Stage
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Modifica la información de este Stage y gestiona sus acciones.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium mb-1 block">Título</label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Título del Stage"
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">
              Descripción
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del Stage"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Estados</h4>
          <MultiSelect
            options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
            selected={selectedStatuses} 
            setSelected={setSelectedStatuses} 
            placeholder="Selecciona estados"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Acciones</h4>
          <ul className="space-y-1">
            {actions.length > 0 ? (
              actions.map((action) => (
                <li key={action.id} className="text-xs flex items-center">
                  ➤ {action.action_type}
                </li>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                Sin acciones registradas.
              </p>
            )}
          </ul>

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 w-full justify-center"
              >
                <PlusIcon className="w-4 h-4" />
                Agregar Acción
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {ACTION_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    addAction(option);
                    setDropdownOpen(false);
                  }}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        <div className="flex justify-end gap-2 mt-auto">
          <Button variant="ghost" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="default" onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
