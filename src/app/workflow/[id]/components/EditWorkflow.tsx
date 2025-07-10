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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multiselect";
import { Separator } from "@/components/ui/separator";

import { WhatsappAgentConfig } from "./templates/WhatsappAgentConfig";
import { WhatsappTemplateConfig } from "./templates/WhatsappTemplateConfig";
import { ScoreboardTemplateConfig } from "./templates/ScoreboardTemplateConfig";
import { EmailTemplateConfig } from "./templates/EmailTemplateConfig";
import { CallTemplateConfig } from "./templates/CallTemplateConfig";
import { TemplateSet } from "@/app/Types/Workflow/WorkflowDetailTypes";
import { useTranslations } from "next-intl";
import { clearWhatsappAgents } from "@/store/slices/workflows/Id/WhatsappAgentSlice";
import { clearWorkflowWhatsapp } from "@/store/slices/workflows/Id/WorkflowWhatsappSlice";
import { clearWorkflowEmail } from "@/store/slices/workflows/Id/WorkflowEmailSlice";
import { clearWorkflowCall } from "@/store/slices/workflows/Id/WorkflowCallSlice";
import { clearWorkflowScoreboards } from "@/store/slices/workflows/Id/WorkflowScoreboardsSlice";
import { useAppDispatch } from "@/app/redux";
import ActionModal from "@/app/components/ActionModal/ActionModal";

type EditWorkflowProps = {
  stage: {
    id: string;
    label: string;
    description?: string;
    actions?: {
      id: string;
      action_type: string;
      [key: string]: any;
    }[];
    statusOptions?: string[];
    color: string;
  };
  templateSet: TemplateSet;
  onUpdate: (
    id: string,
    label: string,
    description: string,
    statusOptions: string[],
    actions: any[]
  ) => void; //
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
function mapActionType(apiActionType: string): string {
  switch (apiActionType.toLowerCase()) {
    case "whatsapp_agent":
      return "Agente de WhatsApp";
    case "whatsapp":
      return "WhatsApp";
    case "scoreboard":
      return "Formulario";
    case "email":
      return "Email";
    case "call":
      return "Agente de voz";
    default:
      return apiActionType;
  }
}
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

export function EditWorkflow({
  stage,
  templateSet,
  onUpdate,
}: EditWorkflowProps) {
  const [label, setLabel] = React.useState(stage.label);

  const t = useTranslations("WorkflowDetails.EditStage");
  const [open, setOpen] = React.useState(false); 
  const [description, setDescription] = React.useState(stage.description || "");
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>(
    stage.statusOptions || []
  );
  const [actions, setActions] = React.useState(
    (stage.actions || []).map((action) => {
      const normalizedType = mapActionType(action.action_type);
      const templateKey = getTemplateKey(normalizedType);
      return {
        ...action,
        action_type: normalizedType,
        [templateKey]:
          typeof action[templateKey] === "string" ? action[templateKey] : "",
      };
    })
  );
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const addAction = (actionType: string) => {
    const templateKey = getTemplateKey(actionType);
    const newAction = {
      id: `${Date.now()}`,
      action_type: actionType,
      [templateKey]: "", // Siempre inicializa la clave correcta
    };

    // Add WhatsApp-specific fields
    if (actionType === "WhatsApp") {
      newAction.executor = "Recruiter"; // Default value
      newAction.delay_minutes = 0; // Default value
    }

    setActions((prev) => [...prev, newAction]);
  };

  const removeAction = (index: number) => {
    setActions((prev) => prev.filter((_, i) => i !== index));
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState<
    "loading" | "success" | "error"
  >("loading");
  const [modalMessage, setModalMessage] = React.useState("");
  const handleSave = () => {
    // ✅ Llama al handler
    onUpdate(stage.id, label, description, selectedStatuses, actions);

    console.log({
      label,
      description,
      statuses: selectedStatuses,
      actions,
    });
     setOpen(false);
    setModalStatus("success");
    setModalMessage(t("successMessage")); // Asegúrate de tener la traducción
    setModalOpen(true);
  };

  const handleCancel = () => {
    console.log("Cancelado");
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="secondary"
            style={{ borderColor: stage.color }}
            className="w-full border-2 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            {t("editStage")}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[420px] p-6 flex flex-col gap-6 bg-background overflow-auto"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold mb-2">
              {t("editStage")}
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              {t("editStageDescription")}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("titleLabel")}
              </label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={t("titlePlaceholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("descriptionLabel")}
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("descriptionPlaceholder")}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-base font-semibold">{t("statusesLabel")}</h4>
            <MultiSelect
              options={STATUS_OPTIONS.map((s) => ({ label: s, value: s }))}
              selected={selectedStatuses}
              setSelected={setSelectedStatuses}
              placeholder={t("statusesPlaceholder")}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-base font-semibold">{t("actionsLabel")}</h4>

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
                        {/* WhatsApp specific fields */}
                        {action.action_type === "WhatsApp" && (
                          <div className="space-y-4 mb-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">
                                Executor
                              </label>
                              <Select
                                value={action.executor || "Recruiter"}
                                onValueChange={(value) => {
                                  const updated = [...actions];
                                  updated[index] = { ...action, executor: value };
                                  setActions(updated);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select executor" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                                  <SelectItem value="Company">Company</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">
                                Delay Minutes
                              </label>
                              <Input
                                type="number"
                                value={action.delay_minutes || 0}
                                onChange={(e) => {
                                  const updated = [...actions];
                                  updated[index] = { 
                                    ...action, 
                                    delay_minutes: parseInt(e.target.value) || 0 
                                  };
                                  setActions(updated);
                                }}
                                placeholder="Enter delay in minutes"
                                min="0"
                              />
                            </div>
                          </div>
                        )}
                        
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
              <p className="text-sm text-muted-foreground">{t("noActions")}</p>
            )}

            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 w-full justify-center rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <PlusIcon className="w-4 h-4" />
                  {t("addAction")}
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
              {t("cancel")}
            </Button>
            <Button variant="default" onClick={handleSave}>
              {t("saveChanges")}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <ActionModal
        open={modalOpen}
        status={modalStatus}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
