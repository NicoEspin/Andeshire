"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";
import { JobListItem } from "@/app/jobs/[id]/types/JobTypes";

interface ActionCompareProps {
  jobList: JobListItem[];
  loading: boolean;
  error: string | null;
}

const ActionCompare = ({ jobList, loading, error }: ActionCompareProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobList.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-purple-100 hover:text-purple-700"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Comparar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Selecciona un trabajo para comparar el candidato</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Buscar trabajos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <span className="text-sm font-medium">
                {job.title} - {job.company?.name}
              </span>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Comparar
              </Button>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <p className="text-sm text-gray-500">No se encontraron trabajos.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionCompare;
