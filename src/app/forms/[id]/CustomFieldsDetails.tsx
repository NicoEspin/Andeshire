"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

type CustomField = {
  id: string;
  name: string;
  field_type: string;
  required: boolean;
  description: string;
  visible: boolean;
  choices?: string | null;
};

export default function CustomFieldsDetails({ field }: { field: CustomField }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("FormDetails.CustomFieldsDetails");

  return (
    <>
      <Button
        className="cursor-pointer"
        size="icon"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <Eye className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{field.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">{t("Type")}:</span>{" "}
              {field.field_type}
            </p>
            <p>
              <span className="font-semibold">{t("Description")}:</span>{" "}
              {field.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">
                {t("Visible")}: {field.visible ? t("Yes") : t("No")}
              </Badge>
              <Badge variant="outline">
                {t("Required")}: {field.required ? t("Yes") : t("No")}
              </Badge>
            </div>
            {field.choices && (
              <div>
                <p className="font-semibold mt-2">{t("Options")}:</p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  {JSON.parse(field.choices).map(
                    (choice: string, idx: number) => (
                      <li key={idx}>{choice}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
