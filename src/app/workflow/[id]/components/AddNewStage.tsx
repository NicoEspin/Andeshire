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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, ChevronDown, Trash2 } from "lucide-react";
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
import { WhatsappAgentConfig } from "./templates/WhatsappAgentConfig";
import { WhatsappTemplateConfig } from "./templates/WhatsappTemplateConfig";
import { ScoreboardTemplateConfig } from "./templates/ScoreboardTemplateConfig";
import { EmailTemplateConfig } from "./templates/EmailTemplateConfig";
import { CallTemplateConfig } from "./templates/CallTemplateConfig";
import { TemplateSet } from "@/app/Types/Workflow/WorkflowDetailTypes";

type AddNewStageProps = {
  onAddStage: (newStage: any) => void;
  existingStages: any[];
  templateSet: TemplateSet;
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

const ACTION_CONFIGS: Record<
  string,
  {
    label: string;
    Form?: React.FC<{
      action: any;
      onChange: (updatedAction: any) => void;
      templateSet?: TemplateSet;
    }>;
  }
> = {
  "Agente de WhatsApp": {
    label: "Agente de WhatsApp",
    Form: WhatsappAgentConfig,
  },
  WhatsApp: {
    label: "WhatsApp",
    Form: WhatsappTemplateConfig,
  },
  Formulario: {
    label: "Formulario",
    Form: ScoreboardTemplateConfig,
  },
  Email: {
    label: "Email",
    Form: EmailTemplateConfig,
  },
  "Agente de voz": {
    label: "Agente de voz",
    Form: CallTemplateConfig,
  },
};

function getTemplateKey(actionType: string): string {
  switch (actionType) {
    case "Agente de voz":
      return "call_template_id";
    case "Email":
      return "email_template_id";
    case "WhatsApp":
      return "whatsapp_template_id";
    case "Agente de WhatsApp":
      return "whatsapp_agent_template_id";
    case "Formulario":
      return "scoreboard_template_id";
    default:
      return "template_id";
  }
}

export function AddNewStage({
  onAddStage,
  existingStages,
  templateSet,
}: AddNewStageProps) {
  const [label, setLabel] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [actions, setActions] = React.useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { fitView, zoomTo, getNode } = useReactFlow();

  const addAction = (actionType: string) => {
    const templateKey = getTemplateKey(actionType);
    setActions((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        action_type: actionType,
        [templateKey]: "",
      },
    ]);
  };

  const removeAction = (index: number) => {
    setActions((prev) => prev.filter((_, i) => i !== index));
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

    setLabel("");
    setDescription("");
    setSelectedStatuses([]);
    setActions([]);
    setOpen(false);

    setTimeout(() => {
      const node = getNode(newStage.id);
      if (node) {
        zoomTo(1.5);
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
        className="w-[420px] p-6 flex flex-col gap-6 bg-background overflow-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mb-2">
            Crear nueva etapa
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Define la información y acciones de la nueva etapa del Workflow.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Título</label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Título del Stage"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Descripción</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción del Stage"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-base font-semibold">Estados</h4>
          <MultiSelect
            options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
            selected={selectedStatuses}
            setSelected={setSelectedStatuses}
            placeholder="Selecciona estados"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-base font-semibold">Acciones</h4>

          {actions.length > 0 ? (
            <Accordion type="multiple" className="space-y-2">
              {actions.map((action, index) => {
                const ActionForm = ACTION_CONFIGS[action.action_type]?.Form;

                return (
                  <AccordionItem
                    key={action.id}
                    value={action.id}
                    className="border rounded-lg p-3 bg-muted/50"
                  >
                    <AccordionTrigger className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {action.action_type}
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAction(index);
                        }}
                        className="text-red-500 hover:bg-red-100 p-1 rounded transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {ActionForm && (
                        <ActionForm
                          action={action}
                          onChange={(updatedAction) => {
                            const updated = [...actions];
                            updated[index] = updatedAction;
                            setActions(updated);
                          }}
                          templateSet={templateSet}
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sin acciones registradas.
            </p>
          )}

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 w-full justify-center rounded-lg shadow-sm hover:shadow-md transition"
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
          <Button
            variant="ghost"
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
          <Button variant="default" onClick={handleSave}>
            Crear Etapa
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
