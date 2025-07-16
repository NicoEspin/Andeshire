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
import WhatsappData from "./data/whatsappmock.json";
import EmptyState from "@/app/components/EmptyState";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import WhatsappSidebar from "./WhatsappSidebar";
import { useTranslations } from "next-intl";

type Template = {
  id: string;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  recruiter: string;
};

const WhatsappTable = ({ searchQuery }: { searchQuery: string }) => {
  const templates: Template[] = WhatsappData.templates;

  const [openSidebar, setOpenSidebar] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<"view" | "edit">("view");

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const t = useTranslations("Templates.TemplatesView.WhatsApp");

  const handleRowClick = (template: Template) => {
    setSelectedTemplate(template);
    setSidebarMode("view");
    setOpenSidebar(true);
  };
  const handleEditClick = (template: Template) => {
    setSelectedTemplate(template);
    setSidebarMode("edit");
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
                    <TableCell className="max-w-xs truncate">
                      {template.content.slice(0, 100)}...
                    </TableCell>
                    <TableCell>
                      {new Date(template.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(template.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="p-2 cursor-pointer"
                              variant="outline"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(template);
                              }}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(template);
                              }}
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
                              onClick={(e) => e.stopPropagation()}
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
          {/* Paginación futura */}
        </CardFooter>
      </Card>

      <WhatsappSidebar
        open={openSidebar}
        onOpenChange={setOpenSidebar}
        template={selectedTemplate}
        mode={sidebarMode}
      />
    </>
  );
};

export default WhatsappTable;
