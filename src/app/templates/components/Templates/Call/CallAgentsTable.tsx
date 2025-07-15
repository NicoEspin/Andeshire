"use client";

import React, { useState } from "react";
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
import callMock from "./data/callmock.json";
import EmptyState from "@/app/components/EmptyState";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import CallAgentsSidebar, { CallAgent } from "./CallAgentsSidebar";

type Props = {};

const CallAgentsTable = (props: Props) => {
  const t = useTranslations("Templates.TemplatesView.CallAgents");
  const agents: CallAgent[] = callMock.templates;

  // Estado para sidebar
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<CallAgent | null>(null);

  const handleRowClick = (agent: CallAgent) => {
    setSelectedAgent(agent);
    setOpenSidebar(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t("Title")}</CardTitle>
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
                  <TableHead>{t("FirstMessage")}</TableHead>
                  <TableHead>{t("MaxAttempts")}</TableHead>
                  <TableHead>{t("Interval")}</TableHead>
                  <TableHead>{t("AskPermission")}</TableHead>
                  <TableHead>{t("CreatedAt")}</TableHead>
                  <TableHead>{t("UpdatedAt")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow
                    key={agent.id}
                    onClick={() => handleRowClick(agent)}
                    className="cursor-pointer hover:bg-muted"
                  >
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
                      {agent.first_message.slice(0, 50)}...
                    </TableCell>
                    <TableCell>{agent.max_attempts}</TableCell>
                    <TableCell>{agent.interval_minutes}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          agent.ask_permission
                            ? "text-green-600 border-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {agent.ask_permission ? t("Yes") : t("No")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(agent.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(agent.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()} // 🛑 Para evitar abrir la fila al clickear acciones
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="p-2 cursor-pointer"
                              variant="outline"
                              size="icon"
                              onClick={() => handleRowClick(agent)}
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
          {/* Espacio para paginación si lo necesitas */}
        </CardFooter>
      </Card>

      <CallAgentsSidebar
        open={openSidebar}
        onOpenChange={setOpenSidebar}
        agent={selectedAgent}
      />
    </>
  );
};

export default CallAgentsTable;
