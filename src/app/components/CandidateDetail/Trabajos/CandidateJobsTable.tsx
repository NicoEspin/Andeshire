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

import { Plus } from "lucide-react";
import JobDetailModal from "./JobDetailModal";
import { Button } from "@/components/ui/button";

type CandidateJobsTableProps = {
  candidate: CandidateDetail;
};

export default function CandidateJobsTable({
  candidate,
}: CandidateJobsTableProps) {
  const { jobs } = candidate;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Trabajos</h2>
        <Button
          size="sm"
          className="bg-purple-700 text-white hover:bg-purple-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Añadir Trabajo
        </Button>
      </div>

      {!jobs || jobs.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          No hay trabajos asociados para este candidato.
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Título</TableHead>
                <TableHead className="w-[120px] text-center">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-muted transition-colors"
                >
                  <TableCell className="font-medium text-purple-700">
                    {job.title}
                  </TableCell>
                  <TableCell className="text-center">
                    <JobDetailModal candidate={candidate} jobId={job.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
