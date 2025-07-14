"use client";

import React from "react";
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

type Props = {};

const EmailsTable = (props: Props) => {
  const templates = emailMock.templates;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Email Templates</CardTitle>
      </CardHeader>
      <CardContent>
        {templates.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Contenido</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Fecha Actualización</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
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
                  <TableCell className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="p-2 cursor-pointer"
                            variant="outline"
                            size="icon"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Ver Detalles</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="p-2 text-green-500 hover:text-green-600 cursor-pointer"
                            variant="outline"
                            size="icon"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className="p-2 text-red-500 hover:text-red-600 cursor-pointer"
                            variant="outline"
                            size="icon"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Eliminar</TooltipContent>
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
  );
};

export default EmailsTable;
