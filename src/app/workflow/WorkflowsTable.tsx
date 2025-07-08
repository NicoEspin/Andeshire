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

type WorkflowsTableProps = {
  workflows: WorkflowItem[];
};

export default function WorkflowsTable({ workflows }: WorkflowsTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedWorkflow, setSelectedWorkflow] =
    React.useState<WorkflowItem | null>(null);
  const [isStageDetailsOpen, setIsStageDetailsOpen] = React.useState(false);

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Workflows</h2>
        <div className="w-full mt-4">
          <Input
            placeholder="Search by workflow name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Recruiter</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Etapas</TableHead>
              <TableHead>Detalles</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkflows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-muted-foreground"
                >
                  No workflows found.
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
                          Trabajos en donde se usa
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Eliminar workflow
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <StageDetails
        workflow={selectedWorkflow}
        open={isStageDetailsOpen}
        onClose={() => setIsStageDetailsOpen(false)}
      />
    </div>
  );
}
