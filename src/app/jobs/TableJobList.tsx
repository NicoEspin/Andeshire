"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobListItem } from "@/app/jobs/[id]/types/JobTypes";

type TableJobListProps = {
  jobList: JobListItem[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function TableJobList({
  jobList,
  loading,
  error,
  totalPages,
  currentPage,
  onPageChange,
}: TableJobListProps) {
  const [filters, setFilters] = React.useState<Record<string, string>>({
    title: "",
    company: "",
    category: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = jobList.filter((job) => {
    return (
      job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      job.company.name.toLowerCase().includes(filters.company.toLowerCase()) &&
      job.category.toLowerCase().includes(filters.category.toLowerCase())
    );
  });

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full space-y-4 pr-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-xl font-semibold">Lista de Trabajos</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Filtrar por título"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
          />
          <Input
            placeholder="Filtrar por compañía"
            value={filters.company}
            onChange={(e) => handleFilterChange("company", e.target.value)}
          />
          <Input
            placeholder="Filtrar por categoría"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Compañía</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Aplicantes</TableHead>
              <TableHead>Candidatos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Creado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((job) => (
              <TableRow key={job.id} className="h-15">
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.category}</TableCell>
                <TableCell>{job.applicant_count}</TableCell>
                <TableCell>{job.candidate_count}</TableCell>
                <TableCell>
                  {job.is_open ? (
                    <span className="text-green-600 font-medium">Abierto</span>
                  ) : (
                    <span className="text-red-600 font-medium">Cerrado</span>
                  )}
                </TableCell>
                <TableCell>{job.priority}</TableCell>
                <TableCell>
                  {new Date(job.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Paginación */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={handlePrev}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
