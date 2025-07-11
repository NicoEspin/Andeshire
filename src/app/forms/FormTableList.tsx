"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import formList from "./data/formlist.json";
import { FormDetails } from "./FormDetails";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {};

const FormTable = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const templates = formList.templates;
  const t = useTranslations("Forms");

  // Filtrar formularios por nombre
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filtro de búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("filterTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2"
            />
            <Button className="flex items-center gap-2 text-white bg-purple-600 cursor-pointer font-medium hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              {t("AddFormButton")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de formularios */}
      <Card className="border rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold">{t("tableTitle")}</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">{t("name")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead>{t("recruiter")}</TableHead>
              <TableHead>{t("createdAt")}</TableHead>
              <TableHead>{t("updatedAt")}</TableHead>
              <TableHead className="text-center">{t("customFields")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/forms/${template.id}`}
                    className="hover:underline text-primary"
                  >
                    {template.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <FormDetails
                    name={template.name}
                    description={template.description}
                  />
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{template.recruiter_name}</Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(template.created_at), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(template.updated_at), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="text-center">
                  <Badge>{template.custom_fields.length}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default FormTable;
