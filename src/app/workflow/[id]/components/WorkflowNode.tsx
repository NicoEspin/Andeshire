"use client";

import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EditWorkflow } from "./EditWorkflow";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge"; // ✅ Usa tu Badge UI
import { TemplateSet } from "@/app/Types/Workflow/WorkflowDetailTypes";
import { useTranslations } from "next-intl";

export type WorkflowNodeData = {
  id: string;
  label: string;
  description?: string;
  actions?: { id: string; action_type: string; template_id?: string }[];
  statusOptions?: string[];
  color: string;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    label: string,
    description: string,
    statusOptions: string[],
    actions: any[]
  ) => void;
  templateSet: TemplateSet;
};

type WorkflowNodeProps = {
  data: WorkflowNodeData;
};

export default function WorkflowNode({ data }: WorkflowNodeProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const t = useTranslations("WorkflowDetails.Canvas.WorkflowNode");

  const statusColor = data.statusOptions?.includes("rejected")
    ? "bg-red-100 border-red-300"
    : data.statusOptions?.includes("active")
    ? "bg-green-100 border-green-300"
    : "bg-white border-gray-200";

  return (
    <div className="relative">
      <Card
        className={cn(
          "w-64 rounded-xl border shadow-md transition hover:shadow-xl",
          statusColor
        )}
        style={{
          borderTop: `6px solid ${data.color}`,
        }}
      >
        <CardHeader className="pb-2 flex flex-col gap-2">
          <div className="flex items-start justify-between w-full">
            {/* Badges o placeholder vacío para ocupar espacio */}
            {data.statusOptions && data.statusOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {data.statusOptions.map((status) => (
                  <Badge
                    key={status}
                    variant="outline"
                    className="text-xs px-2 py-0.5 rounded-full"
                  >
                    {status}
                  </Badge>
                ))}
              </div>
            ) : (
              <div /> // 👉 Esto hace que el Trash se mantenga a la derecha
            )}

            <Button
              variant="ghost"
              size="icon"
              className="p-1"
              onClick={() => setOpenDeleteModal(true)}
            >
              <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
            </Button>
          </div>

          {/* Título y descripción */}
          <div>
            <h3 className="text-sm font-semibold">{data.label}</h3>
            {data.description && (
              <p className="text-xs text-muted-foreground">
                {data.description}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          {data.actions && data.actions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.actions.map((a) => (
                <span
                  key={a.id}
                  className="text-xs bg-muted px-2 py-1 rounded-full shadow-sm border"
                >
                  {a.action_type}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">{t("NoActions")}</p>
          )}
        </CardContent>

        <CardFooter>
          <EditWorkflow
            stage={{
              id: data.id,
              label: data.label,
              description: data.description,
              actions: data.actions,
              statusOptions: data.statusOptions,
              color: data.color,
            }}
            templateSet={data.templateSet}
            onUpdate={data.onUpdate}
          />
        </CardFooter>
      </Card>

      {/* Modal de confirmación */}
      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("DeleteStage.Title")}</DialogTitle>
            <DialogDescription>
              {t("DeleteStage.Description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
              {t("DeleteStage.Cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                data.onDelete(data.id);
                setOpenDeleteModal(false);
              }}
            >
              {t("DeleteStage.Confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
        style={{ background: data.color }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2"
        style={{ background: data.color }}
      />
    </div>
  );
}
