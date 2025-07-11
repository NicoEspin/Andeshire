"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import CustomFieldsDetails from "./CustomFieldsDetails";
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

type FormDetailsProps = {
  name: string;
  description: string;
  recruiter: string;
  customFields: CustomField[];
};

export default function FormDetails({
  name,
  description,
  recruiter,
  customFields,
}: FormDetailsProps) {
  const t = useTranslations("FormDetails");

  return (
    <div className="space-y-6">
      {/* Botón de volver */}
      <Link href="/forms">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("BackToForms")}
        </Button>
      </Link>

      {/* Card principal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {t("ByRecruiter", { recruiter })}
          </p>
        </CardHeader>
      </Card>

      {/* Tabla de Campos Personalizados */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t("CustomFields")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Name")}</TableHead>
                <TableHead>{t("Type")}</TableHead>
                <TableHead>{t("Visible")}</TableHead>
                <TableHead>{t("Required")}</TableHead>
                <TableHead>{t("Details")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customFields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{field.field_type}</TableCell>
                  <TableCell>{field.visible ? t("Yes") : t("No")}</TableCell>
                  <TableCell>{field.required ? t("Yes") : t("No")}</TableCell>
                  <TableCell>
                    <CustomFieldsDetails field={field} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Botón para editar campos personalizados */}
          <div className="mt-6">
            <Button variant="outline">
              <Pencil className="size-4 mr-1" />
              {t("EditCustomFields")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
