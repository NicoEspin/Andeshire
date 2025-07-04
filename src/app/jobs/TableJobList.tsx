"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { JobListItem, JobListResponse } from "@/app/jobs/[id]/types/JobTypes";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  jobList: JobListItem[];
  loading: boolean;
  error: string | null;
  filters: JobListResponse["filters"];
  filtersApplied: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
};

export default function TableJobList({
  jobList,
  loading,
  error,
  filters,
  filtersApplied,
  onFilterChange,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onFilterChange({
      ...filtersApplied,
      updated_at: date ? format(date, "yyyy-MM-dd") : undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Lista de Empleos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>
                Categoría
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <Select
                      onValueChange={(val) =>
                        onFilterChange({
                          ...filtersApplied,
                          category: val === "all" ? undefined : val,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={filtersApplied.category || "Todas"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {filters.categories?.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>
                Compañía
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <Select
                      onValueChange={(val) =>
                        onFilterChange({
                          ...filtersApplied,
                          company: val === "all" ? undefined : val,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={filtersApplied.company || "Todas"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        {filters.companies?.map(
                          (comp) =>
                            comp && (
                              <SelectItem key={comp} value={comp}>
                                {comp}
                              </SelectItem>
                            )
                        )}
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>
                Última Actualización
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>Analizado</TableHead>
              <TableHead>Postulados</TableHead>
              <TableHead>Candidatos</TableHead>
              <TableHead>Prioridad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>Cargando...</TableCell>
              </TableRow>
            ) : jobList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>No hay puestos.</TableCell>
              </TableRow>
            ) : (
              jobList.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Link href="/jobs/b1a947d7-ec97-4380-b1de-0416f0f5c3e4">
                      <Button
                        variant="link"
                        className=" hover:underline cursor-pointer"
                      >
                        {job.title}
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>{job.category || "N/A"}</TableCell>
                  <TableCell>{job.company?.name || "N/A"}</TableCell>
                  <TableCell>{formatDate(job.updated_at)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={job.is_job_analyzed ? "default" : "outline"}
                      className={`${
                        job.is_job_analyzed
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.is_job_analyzed ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applicant_count}</TableCell>
                  <TableCell>{job.candidate_count}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        job.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : job.priority === "normal"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
