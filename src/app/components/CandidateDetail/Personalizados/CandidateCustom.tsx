"use client";

import React from "react";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, TextCursorInput, List, CheckSquare, Calendar, FileText, ToggleRight } from "lucide-react";
import { useTranslations } from "next-intl";

type CandidateCustomProps = {
  candidate: CandidateDetail;
};

// Iconos por tipo
const fieldIcons: Record<string, React.ReactNode> = {
  text: <TextCursorInput className="w-5 h-5 text-purple-700" />,
  select: <List className="w-5 h-5 text-purple-700" />,
  multi_select: <CheckSquare className="w-5 h-5 text-purple-700" />,
  date: <Calendar className="w-5 h-5 text-purple-700" />,
  file: <FileText className="w-5 h-5 text-purple-700" />,
  boolean: <ToggleRight className="w-5 h-5 text-purple-700" />,
};

export default function CandidateCustom({ candidate }: CandidateCustomProps) {
  const t = useTranslations("CandidateDetail.CustomFields");
  const fields = candidate?.custom_fields || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold">{t("Title")}</h2>
        <Badge variant="outline" className="text-purple-700 border-purple-700">
          {t("Count", { count: fields.length })}
        </Badge>
      </div>

      {fields.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t("Empty")}</p>
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
                    <h3 className="text-lg font-semibold">{field.field_name}</h3>
                  </div>
                  {field.has_value === "true" ? (
                    <Badge variant="outline" className="text-green-700 border-green-700">
                      {t("Completed")}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 border-gray-300">
                      {t("EmptyBadge")}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-xs uppercase text-gray-400 mb-1">
                  {getFieldTypeLabel(field.field_type, t)}
                </p>

                {field.placeholder && (
                  <p className="italic text-gray-500 mb-2">{field.placeholder}</p>
                )}

                {renderFieldValue(field, t)}

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

function getFieldTypeLabel(fieldType: string, t: ReturnType<typeof useTranslations>) {
  return t(`Types.${fieldType}`) || t("Types.default");
}

function renderFieldValue(
  field: {
    field_type: string;
    value: string | string[] | null;
    options?: string[] | null;
    has_value: string;
  },
  t: ReturnType<typeof useTranslations>
) {
  if (field.has_value === "false" || !field.value) {
    return <p className="text-sm text-gray-500 italic">{t("AssignedNone")}</p>;
  }

  const selectedValues: string[] =
    Array.isArray(field.value) && field.value.length > 0
      ? field.value
      : typeof field.value === "string" && field.field_type === "multi_select"
      ? [field.value]
      : [];

  const hasOptions = Array.isArray(field.options) && field.options.length > 0;

  switch (field.field_type) {
    case "select":
    case "multi_select":
      return (
        <div className="space-y-2">
          {selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((val, index) => (
                <Badge key={index} variant="outline">
                  {val}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">{t("SelectedNone")}</p>
          )}

          {hasOptions && (
            <div className="mt-2">
              <p className="text-xs uppercase text-gray-400 mb-1">{t("AvailableOptions")}</p>
              <div className="flex flex-wrap gap-2">
                {field.options!.map((option, index) => (
                  <Badge key={index} variant="secondary" className="text-xs text-gray-700">
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case "text":
    case "date":
      return (
        <Badge variant="secondary">
          <p className="text-sm">{field.value}</p>
        </Badge>
      );

    case "file":
      return (
        <a
          href={field.value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-purple-700 underline"
        >
          {t("DownloadFile")}
        </a>
      );

    case "boolean":
    case "checkbox": {
      const valueStr = Array.isArray(field.value) ? field.value.join(",") : field.value ?? "";
      const isTrue = valueStr === "true" || valueStr === "1";

      return (
        <Badge
          variant="outline"
          className={isTrue ? "text-green-700 border-green-700" : "text-red-700 border-red-700"}
        >
          {isTrue ? t("Yes") : t("No")}
        </Badge>
      );
    }

    default:
      return <p className="text-sm">{field.value as string}</p>;
  }
}
