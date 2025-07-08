"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Tu util para combinar clases Tailwind
import { EditWorkflow } from "./EditWorkflow";
import { Trash } from "lucide-react";

type WorkflowNodeProps = {
  data: {
    id: string;
    label: string;
    description?: string;
    actions?: { id: string; action_type: string }[];
    statusOptions?: string[];
    color: string; // 👈 Color único del nodo
    onDelete: (id: string) => void;
  };
};

export default function WorkflowNode({ data }: WorkflowNodeProps) {
  // 🎨 Color de fondo por status
  const statusColor = data.statusOptions?.includes("rejected")
    ? "bg-red-100 border-red-300"
    : data.statusOptions?.includes("active")
    ? "bg-green-100 border-green-300"
    : "bg-white border-gray-200";
  const statusOptions = data.statusOptions ?? [];
  return (
    <div className="relative">
      <Card
        className={cn(
          "w-64 rounded-xl border shadow-md transition hover:shadow-xl",
          statusColor
        )}
        style={{
          borderTop: `6px solid ${data.color}`, // 🎨 Borde superior con color único
        }}
      >
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <div>
            <h3 className="text-sm font-semibold">{data.label}</h3>
            {data.description && (
              <p className="text-xs text-muted-foreground">
                {data.description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => data.onDelete(data.id)}
          >
            <Trash className="w-4 h-4 text-red-500 hover:text-red-700" />
          </Button>
        </CardHeader>
        <CardContent className="pb-2">
          {data.actions?.length ? (
            <ul className="text-xs space-y-1">
              {data.actions.map((a) => (
                <li key={a.id} className="text-gray-700">
                  ➤ {a.action_type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">Sin acciones</p>
          )}
        </CardContent>
        <CardFooter>
          <EditWorkflow
            stage={{
              id: data.label,
              label: data.label,
              description: data.description,
              actions: data.actions,
              statusOptions: data.statusOptions,
              color: data.color,
            }}
          />
        </CardFooter>
      </Card>

      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
        style={{ background: data.color }} // 🎨 Handle superior
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2"
        style={{ background: data.color }} // 🎨 Handle inferior
      />
    </div>
  );
}
