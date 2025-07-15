"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
import emailAgentsMock from "./data/emailagentsmock.json";
import EmptyState from "@/app/components/EmptyState";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Props = {};

const EmailAgentsTable = (props: Props) => {
  const t = useTranslations("Templates.TemplatesView.EmailAgents");
  const agents = emailAgentsMock.templates;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {t("Title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {agents.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Name")}</TableHead>
                <TableHead>{t("Prompt")}</TableHead>
                <TableHead>{t("Task")}</TableHead>
                <TableHead>{t("FirstMessage")}</TableHead>
                <TableHead>{t("Direction")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead>{t("CreatedAt")}</TableHead>
                <TableHead>{t("UpdatedAt")}</TableHead>
                <TableHead>{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    {agent.name ? (
                      <Badge
                        variant="outline"
                        className="text-purple-600 border-purple-600"
                      >
                        {agent.name}
                      </Badge>
                    ) : (
                      <span className="italic text-muted-foreground">
                        {t("NoName")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {agent.prompt.slice(0, 50)}...
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {agent.task.slice(0, 50)}...
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {agent.first_message.slice(0, 50)}...
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {agent.direction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${
                        agent.status === "active"
                          ? "text-green-600 border-green-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(agent.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(agent.updated_at).toLocaleDateString()}
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
                        <TooltipContent>{t("View")}</TooltipContent>
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
                        <TooltipContent>{t("Edit")}</TooltipContent>
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
        {/* Espacio para futura paginación */}
      </CardFooter>
    </Card>
  );
};

export default EmailAgentsTable;
