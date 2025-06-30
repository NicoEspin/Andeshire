"use client";

import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type CandidateJobsTableProps = {
  candidate: CandidateDetail;
};

export default function CandidateJobsTable({
  candidate,
}: CandidateJobsTableProps) {
  const { jobs } = candidate;

  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No hay trabajos asociados para este candidato.
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Título</TableHead>
            <TableHead>Compañía</TableHead>
            <TableHead className="w-[120px] text-center">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.id}
              className="hover:bg-muted transition-colors cursor-pointer"
            >
              <TableCell className="font-medium text-purple-700">
                {job.title}
              </TableCell>
              <TableCell> {job.company?.name}</TableCell>
              <TableCell className="text-center">
                <Button size="sm" variant="outline" className="gap-1">
                  <Info className="w-4 h-4" />
                  Ver detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
