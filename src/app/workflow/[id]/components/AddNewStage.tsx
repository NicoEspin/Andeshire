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
import { MultiSelect } from "@/components/ui/multiselect";
import { Separator } from "@/components/ui/separator";
import { nodeColors } from "@/lib/nodeColors";
import { useReactFlow } from "@xyflow/react";

type AddNewStageProps = {
  onAddStage: (newStage: any) => void;
  existingStages: any[];
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

export function AddNewStage({ onAddStage, existingStages }: AddNewStageProps) {
  const [label, setLabel] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [actions, setActions] = React.useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { fitView, zoomTo, getNode } = useReactFlow();
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
    const nextColor = nodeColors[existingStages.length % nodeColors.length];
    const newStage = {
      id: `${Date.now()}`,
      name: label,
      description,
      order: existingStages.length,
      actions,
      status_options: selectedStatuses,
      next_possible_stages: [],
      color: nextColor,
      
    };

    onAddStage(newStage);

    // ✅ Limpia
    setLabel("");
    setDescription("");
    setSelectedStatuses([]);
    setActions([]);

    // ✅ Cierra Sheet
    setOpen(false);

    // ✅ Mueve vista al nuevo nodo
    setTimeout(() => {
      const node = getNode(newStage.id);
      if (node) {
        zoomTo(1.5); // Zoom opcional
        fitView({ nodes: [node], duration: 800, padding: 0.2 });
      }
    }, 200);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="flex items-center gap-1" variant="default">
          <PlusIcon className="w-4 h-4" />
          Añadir etapa
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] p-6 flex flex-col gap-6 bg-background"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-bold mb-2">
            Crear nueva etapa
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Define la información básica para el nuevo nodo del Workflow.
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
          <Button variant="default" onClick={handleSave}>
            Crear Etapa
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setLabel("");
              setDescription("");
              setSelectedStatuses([]);
              setActions([]);
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
