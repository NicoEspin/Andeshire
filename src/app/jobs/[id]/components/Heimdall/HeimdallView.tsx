"use client";

import React, { useState } from "react";
import { mockHeimdallAnalysis } from "../../data/mockHeimdallAnalysis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const HeimdallView = () => {
  const data = mockHeimdallAnalysis;
  const candidates = data.candidates;

  const [selected, setSelected] = useState<string[]>([]);
  const currentPage = data.pagination.current_page;
  const totalPages = data.pagination.total_pages;

  const allSelected = selected.length === candidates.length;
  const toggleAll = () => {
    setSelected(allSelected ? [] : candidates.map((c) => c.id));
  };
  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getBadgeClass = (value: string) => {
    if (value === "APLICA FUERTEMENTE") return "bg-green-100 text-green-800";
    if (value === "APLICA") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const renderPaginationNumbers = () => {
    const visiblePages: (number | string)[] = [];
    const maxVisible = 5;

    for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
      visiblePages.push(i);
    }

    if (totalPages > maxVisible) {
      visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages.map((page, idx) =>
      typeof page === "number" ? (
        <Button
          key={idx}
          size="sm"
          variant={page === currentPage ? "default" : "outline"}
        >
          {page}
        </Button>
      ) : (
        <span key={idx} className="text-muted-foreground px-2">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-x-auto p-4 space-y-4">
      {/* HEADER CON DATOS DEL MOCK */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 text-sm font-medium flex items-center gap-2">
            ✅ Análisis completado
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Se han analizado {data.analysis_process.total_candidates} candidatos.
          <br />
          Procesados: {data.analysis_process.processed_candidates}
          <br />
          <span className="text-xs text-gray-500">
            Completado:{" "}
            {new Date(data.analysis_process.completed_at).toLocaleString()}
          </span>
        </CardContent>
      </Card>

      {/* FILTROS Y ACCIONES */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Input
          placeholder="Buscar candidatos sugeridos..."
          className="w-full md:w-1/3"
        />

        <div className="flex items-center gap-4">
          <Select defaultValue="-match_grade">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-match_grade">Mejor match</SelectItem>
              <SelectItem value="-skills_grade">Mejor skills</SelectItem>
              <SelectItem value="-adaptability_grade">
                Mejor adaptabilidad
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <EyeOff className="h-4 w-4" /> {/* Ver candidatos ocultos */}
          </Button>

          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Reiniciar análisis
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>LinkedIn</TableHead>
            <TableHead>Localización</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Puesto Actual</TableHead>
            <TableHead>Heimdall</TableHead>
            <TableHead>Comparación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(candidate.id)}
                  onCheckedChange={() => toggleOne(candidate.id)}
                />
              </TableCell>
              <TableCell>{candidate.candidate_name}</TableCell>
              <TableCell>
                {candidate.linkedin ? (
                  <Link
                    href={candidate.linkedin}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Perfil
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {candidate.city
                  ? `${candidate.city}, ${candidate.country}`
                  : candidate.location || "-"}
              </TableCell>
              <TableCell>{candidate.email || "-"}</TableCell>
              <TableCell>{candidate.phone_number || "-"}</TableCell>
              <TableCell>{candidate.current_job_title}</TableCell>
              <TableCell>
                <Badge className={getBadgeClass(candidate.heimdall)}>
                  {candidate.heimdall}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeClass(candidate.strong_result)}>
                  {candidate.strong_result}
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="icon" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center pt-4 border-t">
        <span className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={data.pagination.has_previous === "false"}
          >
            Anterior
          </Button>

          {renderPaginationNumbers()}

          <Button
            variant="outline"
            size="sm"
            disabled={data.pagination.has_next === "false"}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeimdallView;
