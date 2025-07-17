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
import httpAgentsMock from "./data/httpagentsmock.json";
import EmptyState from "@/app/components/EmptyState";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import HttpAgentsSidebar from "./HttpAgentsSidebar";
import { useTranslations } from "next-intl";
import { sliceContentWithoutBreakingKeys } from "../hooks/sliceContentWithoutBreakingKeys";
import { useContentWithBadges } from "../hooks/useContentWithBadges";

type HttpAgent = {
  id: string;
  name: string;
  method: string;
  url: string;
  timeout: number;
  retries: number;
  request_body: string;
  created_at: string;
  updated_at: string;
  save_output: string[];
  query_params: Record<string, string>;
  headers: Record<string, string>;
};

type Props = {};

const HttpAgentsTable = ({ searchQuery }: { searchQuery: string }) => {
  const t = useTranslations("Templates.TemplatesView.HTTPAgents");
  const agents: HttpAgent[] = httpAgentsMock.templates;

  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<HttpAgent | null>(null);

  const handleRowClick = (agent: HttpAgent) => {
    setSelectedAgent(agent);
    setOpenSidebar(true);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{t("Title")}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAgents.length === 0 ? (
            <EmptyState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Name")}</TableHead>
                  <TableHead>{t("Method")}</TableHead>
                  <TableHead>{t("URL")}</TableHead>
                  <TableHead>{t("Timeout")}</TableHead>
                  <TableHead>{t("Retries")}</TableHead>
                  <TableHead>{t("Body")}</TableHead>
                  <TableHead>{t("CreatedAt")}</TableHead>
                  <TableHead>{t("UpdatedAt")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
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
                          {t("Unnamed")}
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="uppercase">
                        {agent.method}
                      </Badge>
                    </TableCell>

                    <TableCell className="max-w-xs truncate">
                      {useContentWithBadges(sliceContentWithoutBreakingKeys(agent.url, 50))}
                    </TableCell>

                    <TableCell>{agent.timeout}s</TableCell>
                    <TableCell>{agent.retries}</TableCell>

                    <TableCell className="max-w-xs truncate">
                     {useContentWithBadges(sliceContentWithoutBreakingKeys(agent.request_body, 50))}
                    </TableCell>

                    <TableCell>
                      {new Date(agent.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(agent.updated_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
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
          {/* Espacio para paginación futura */}
        </CardFooter>
      </Card>

      <HttpAgentsSidebar
        open={openSidebar}
        onOpenChange={setOpenSidebar}
        agent={selectedAgent}
      />
    </>
  );
};

export default HttpAgentsTable;
