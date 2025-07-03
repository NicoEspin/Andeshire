"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";
import { fetchJobHeimdall } from "@/state/api/Jobs/Id/FetchJobHeimdall";

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
import { Input } from "@/components/ui/input";
import CandidateCompare from "./CandidateCompare";

// ✅ Ya NO necesitas esta interface
// interface HeimdallViewProps {
//   jobId: string;
// }

const HeimdallView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const {
    candidates,
    analysisProcess,
    filters,
    pagination,
    totalCandidatesAnalyzed,
    loading,
    error,
  } = useSelector((state: RootState) => state.jobHeimdall);

  useEffect(() => {
    if (!candidates.length && !loading) {
      fetchJobHeimdall(dispatch, page);
    }
  }, [dispatch, page, candidates.length, loading]);

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
    const totalPages = pagination?.total_pages || 1;

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < totalPages) {
      visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages.map((p, idx) =>
      typeof p === "number" ? (
        <Button
          key={idx}
          size="sm"
          variant={p === page ? "default" : "outline"}
          onClick={() => setPage(p)}
        >
          {p}
        </Button>
      ) : (
        <span key={idx} className="text-muted-foreground px-2">
          {p}
        </span>
      )
    );
  };

  if (loading) {
    return <div className="p-4">Cargando análisis...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Ocurrió un error: {error}</div>;
  }

  return (
    <div className="rounded-lg border shadow-sm overflow-x-auto p-4 space-y-4">
      {/* HEADER */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 text-sm font-medium flex items-center gap-2">
            ✅ Análisis completado
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Se han analizado {totalCandidatesAnalyzed} candidatos.
          <br />
          Procesados: {analysisProcess?.processed_candidates}
          <br />
          <span className="text-xs text-gray-500">
            Completado:{" "}
            {analysisProcess?.completed_at &&
              new Date(analysisProcess.completed_at).toLocaleString()}
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
            <EyeOff className="h-4 w-4" />
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

      {/* TABLA */}
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
              <TableCell >
                <CandidateCompare
                  candidateId={candidate.candidate_id} 
                  candidateName={candidate.candidate_name}
                  keyPoints={candidate.key_points}
                />
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  Ocultar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center pt-4 border-t">
        <span className="text-sm text-muted-foreground">
          Página {pagination?.current_page} de {pagination?.total_pages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={(pagination?.current_page || 1) <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </Button>

          {renderPaginationNumbers()}

          <Button
            variant="outline"
            size="sm"
            disabled={
              (pagination?.current_page || 1) >= (pagination?.total_pages || 1)
            }
            onClick={() =>
              setPage((p) => Math.min(p + 1, pagination?.total_pages || 1))
            }
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeimdallView;
