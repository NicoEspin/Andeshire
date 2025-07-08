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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface AvailableTemplate {
  id: string;
  name: string;
}

interface TemplateField {
  id: string;
  field_name: string;
  field_type: string;
  description: string;
}

interface AddJobFormProps {
  availableTemplates: AvailableTemplate[];
  getTemplateFields: (templateId: string) => TemplateField[];
}

const AddJobForm: React.FC<AddJobFormProps> = ({
  availableTemplates,
  getTemplateFields,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const t = useTranslations("JobId.Details.Scoreboards.Add");
  const fields =
    selectedTemplate !== null ? getTemplateFields(selectedTemplate) : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white"
        >
          <Plus className="h-4 w-4" /> {t("addNewButton")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>

        {/* Dropdown para seleccionar template */}
        <div className="space-y-4">
          <label className="text-sm font-medium">{t("selectLabel")}</label>
          <Select onValueChange={(value) => setSelectedTemplate(value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {availableTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Renderiza campos de la plantilla seleccionada */}
          {fields.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">{t("fieldsSection")}</h4>
              {fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label className="text-sm font-medium">
                    {field.field_name}
                  </label>
                  {field.field_type === "textarea" ? (
                    <Textarea placeholder={field.description} />
                  ) : (
                    <Input placeholder={field.description} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="secondary">{t("cancel")}</Button>
          <Button
            variant="default"
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobForm;
