"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkflowItem } from "@/app/Types/Workflow/WorkflowListTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, ClipboardList, Trash2 } from "lucide-react";
import StageDetails from "./StageDetails";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WorkflowsTableProps = {
  workflows: WorkflowItem[];
};

export default function WorkflowsTable({ workflows }: WorkflowsTableProps) {
  const t = useTranslations("Workflows");

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedWorkflow, setSelectedWorkflow] =
    React.useState<WorkflowItem | null>(null);
  const [isStageDetailsOpen, setIsStageDetailsOpen] = React.useState(false);

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{t("title")}</CardTitle>
          
        </CardHeader>
        <CardContent>
          <div className="w-full ">
            <Input
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[50%]"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="border rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {t("table.title")}
        </CardTitle>
      </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.name")}</TableHead>
                <TableHead>{t("table.recruiter")}</TableHead>
                <TableHead>{t("table.createdAt")}</TableHead>
                <TableHead>{t("table.stages")}</TableHead>
                <TableHead>{t("table.details")}</TableHead>
                <TableHead>{t("table.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkflows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    {t("table.noResults")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredWorkflows.map((workflow) => (
                  <TableRow
                    key={workflow.id}
                    className="hover:bg-muted transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Link href={`/workflow/${workflow.id}`}>
                        <Button
                          variant="link"
                          className="hover:underline cursor-pointer"
                        >
                          {workflow.name}
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>{workflow.recruiter.name}</TableCell>
                    <TableCell>
                      {new Date(workflow.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>{workflow.stages?.length || 0}</TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedWorkflow(workflow);
                          setIsStageDetailsOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 hover:text-primary transition-colors" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ClipboardList className="w-5 h-5 text-green-500 hover:text-green-600 cursor-pointer transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {t("tooltip.jobsUsedIn")}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {t("tooltip.delete")}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <StageDetails
        workflow={selectedWorkflow}
        open={isStageDetailsOpen}
        onClose={() => setIsStageDetailsOpen(false)}
      />
    </div>
  );
}
