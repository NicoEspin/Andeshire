"use client";

import React, { useState } from "react";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  TextCursorInput,
  List,
  CheckSquare,
  Calendar,
  FileText,
  ToggleRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CandidateCustomEditProps = {
  candidate: CandidateDetail;
};

const fieldIcons: Record<string, React.ReactNode> = {
  text: <TextCursorInput className="w-5 h-5 text-purple-700" />,
  select: <List className="w-5 h-5 text-purple-700" />,
  multi_select: <CheckSquare className="w-5 h-5 text-purple-700" />,
  date: <Calendar className="w-5 h-5 text-purple-700" />,
  file: <FileText className="w-5 h-5 text-purple-700" />,
  boolean: <ToggleRight className="w-5 h-5 text-purple-700" />,
};

export default function CandidateCustomEdit({
  candidate,
}: CandidateCustomEditProps) {
  const [fields, setFields] = useState(candidate?.custom_fields || []);

  const handleChange = (id: string, value: any) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id
          ? { ...field, value, has_value: value ? "true" : "false" }
          : field
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold">Editar Campos Personalizados</h2>
        <Badge variant="outline" className="text-purple-700 border-purple-700">
          {fields.length} campos definidos
        </Badge>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hay campos personalizados definidos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <Card key={field.id} className="shadow-sm border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {fieldIcons[field.field_type] || (
                      <TextCursorInput className="w-5 h-5 text-purple-700" />
                    )}
                    <h3 className="text-lg font-semibold">
                      {field.field_name}
                    </h3>
                  </div>
                  {field.has_value === "true" ? (
                    <Badge
                      variant="outline"
                      className="text-green-700 border-green-700"
                    >
                      Completado
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-gray-500 border-gray-300"
                    >
                      Vacío
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-xs uppercase text-gray-400 mb-1">
                  {getFieldTypeLabel(field.field_type)}
                </p>

                {field.placeholder && (
                  <p className="italic text-gray-500 mb-2">
                    {field.placeholder}
                  </p>
                )}

                {renderEditableField(field, handleChange)}

                {field.help_text && (
                  <div className="flex items-center mt-4">
                    <Info className="w-4 h-4 text-gray-400 mr-1 mt-0.5" />
                    <p className="text-xs text-gray-500">{field.help_text}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function getFieldTypeLabel(fieldType: string) {
  switch (fieldType) {
    case "text":
      return "TEXTO";
    case "select":
      return "SELECCIÓN";
    case "multi_select":
      return "SELECCIÓN MÚLTIPLE";
    case "date":
      return "FECHA";
    case "file":
      return "ARCHIVO";
    case "boolean":
      return "BOOLEANO";
    default:
      return "CAMPO";
  }
}

function renderEditableField(
  field: {
    id: string;
    field_type: string;
    value: string | string[] | null;
    options?: string[] | null;
  },
  handleChange: (id: string, value: any) => void
) {
  switch (field.field_type) {
    case "text":
    case "date":
      return (
        <Input
          type={field.field_type === "date" ? "date" : "text"}
          value={(field.value as string) || ""}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      );

    case "select":
      return (
        <Select
          value={(field.value as string) || ""}
          onValueChange={(value) => handleChange(field.id, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "multi_select":
      return (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option, index) => {
            const selected =
              Array.isArray(field.value) && field.value.includes(option);
            return (
              <Badge
                key={index}
                variant={selected ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  let newValues = Array.isArray(field.value)
                    ? [...field.value]
                    : [];
                  if (selected) {
                    newValues = newValues.filter((v) => v !== option);
                  } else {
                    newValues.push(option);
                  }
                  handleChange(field.id, newValues);
                }}
              >
                {option}
              </Badge>
            );
          })}
        </div>
      );

    case "boolean":
      return (
        <Checkbox
          checked={String(field.value) === "true"}
          onCheckedChange={(checked) =>
            handleChange(field.id, checked ? "true" : "false")
          }
        />
      );

    case "file":
      return (
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            handleChange(field.id, file ? file.name : null);
          }}
        />
      );

    default:
      return (
        <Input
          value={(field.value as string) || ""}
          onChange={(e) => handleChange(field.id, e.target.value)}
        />
      );
  }
}
