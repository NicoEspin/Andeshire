"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash } from "lucide-react";
import emailMock from "./data/emailmock.json";
import EmptyState from "@/app/components/EmptyState";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import EmailsSidebar from "./EmailsSidebar";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
}

type Props = {};

const EmailsTable = ({ searchQuery }: { searchQuery: string }) => {
  const templates: EmailTemplate[] = emailMock.templates;
  const t = useTranslations("Templates.TemplatesView.Email");

  // ✅ Estado para abrir/cerrar sidebar y template seleccionado
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

    const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) 
   
  );

  const handleRowClick = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setOpenSidebar(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t("Title")}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length === 0 ? (
            <EmptyState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead>{t("Subject")}</TableHead>
                  <TableHead>{t("Content")}</TableHead>
                  <TableHead>{t("CreatedAt")}</TableHead>
                  <TableHead>{t("UpdatedAt")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow
                    key={template.id}
                    onClick={() => handleRowClick(template)}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-purple-600 border-purple-600"
                      >
                        {template.name}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.subject}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {template.content.slice(0, 100)}...
                    </TableCell>
                    <TableCell>
                      {new Date(template.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(template.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()} // 🛑 Evita que haga trigger del row
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="p-2 cursor-pointer"
                              variant="outline"
                              size="icon"
                              onClick={() => handleRowClick(template)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("View")}</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="p-2 text-green-500 hover:text-green-600 cursor-pointer"
                              variant="outline"
                              size="icon"
                              onClick={() => console.log("Edit clicked")}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Edit")}</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="p-2 text-red-500 hover:text-red-600 cursor-pointer"
                              variant="outline"
                              size="icon"
                              onClick={() => console.log("Delete clicked")}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Delete")}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Aquí podrías meter paginación en el futuro */}
        </CardFooter>
      </Card>

      <EmailsSidebar
        open={openSidebar}
        onOpenChange={setOpenSidebar}
        template={selectedTemplate}
      />
    </>
  );
};

export default EmailsTable;
