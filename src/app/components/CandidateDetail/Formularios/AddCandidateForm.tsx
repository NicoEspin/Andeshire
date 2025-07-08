"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

type AddCandidateFormProps = {
  templates: { id: string; name: string }[];
};

export default function AddCandidateForm({ templates }: AddCandidateFormProps) {
  const t = useTranslations("CandidateDetail.Scoreboards.Add");
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(
    null
  );
  const [isPublic, setIsPublic] = React.useState(false);
  const [toComplete, setToComplete] = React.useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 text-white hover:bg-purple-800">
          <Plus className="w-4 h-4 mr-2" />
          {t("Button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="template">{t("SelectLabel")}</Label>
            <Select onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template" className="w-full mt-2">
                <SelectValue placeholder={t("SelectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="public"
              checked={isPublic}
              onCheckedChange={(checked) => setIsPublic(!!checked)}
            />
            <Label htmlFor="public">{t("Public")}</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="toComplete"
              checked={toComplete}
              onCheckedChange={(checked) => setToComplete(!!checked)}
            />
            <Label htmlFor="toComplete">{t("ToComplete")}</Label>
          </div>

          <div>
            <h3 className="font-semibold">{t("FieldsTitle")}</h3>
            {/* Aquí puedes renderizar dinámicamente campos adicionales si es necesario */}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">{t("Cancel")}</Button>
            <Button className="bg-purple-700 text-white hover:bg-purple-800">
              {t("Save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
