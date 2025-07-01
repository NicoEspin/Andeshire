"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type JobDetailModalProps = {
  candidate: CandidateDetail;
  jobId: string;
};

export default function JobDetailModal({
  candidate,
  jobId,
}: JobDetailModalProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStage, setSelectedStage] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<"next" | "history" | "all">(
    "next"
  );

  const jobStage = candidate.job_stages.find((stage) => stage.job.id === jobId);
  if (!jobStage) return null;

  // Combinar todas las etapas disponibles
  const allStages = [
    ...(jobStage.next_possible_stages || []),
    ...(jobStage.stage_history?.map((h) => ({
      id: h.stage_id,
      name: h.stage_name,
      order: 0,
    })) || []),
    ...(jobStage.current_stage
      ? [
          {
            id: jobStage.current_stage.id,
            name: jobStage.current_stage.name,
            order: jobStage.current_stage.order,
          },
        ]
      : []),
  ];

  // Eliminar duplicados por ID
  const uniqueStages = Array.from(
    new Map(allStages.map((s) => [s.id, s])).values()
  );

  // Filtrar etapas según filtro activo
  const filteredStages =
    filter === "next"
      ? jobStage.next_possible_stages || []
      : filter === "history"
      ? jobStage.stage_history?.map((h) => ({
          id: h.stage_id,
          name: h.stage_name,
          order: 0,
        })) || []
      : uniqueStages;

  const handleStageChange = (value: string) => {
    setSelectedStage(value);
  };

  const handleMoveCandidate = () => {
    if (selectedStage) {
      console.log("Mover candidato a etapa:", selectedStage);
      // Aquí integras tu lógica para hacer PATCH o actualizar vía API
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1 cursor-pointer">
          <Info className="w-4 h-4" />
          Ver detalle
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-fit w-full">
        <DialogHeader>
          <DialogTitle>Detalle: {jobStage.job.title}</DialogTitle>
          <p className="text-muted-foreground">
            Empresa: {jobStage.job.company}
          </p>
        </DialogHeader>

        {/* ✅ Sección: Filtros y mover candidato */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold">Filtrar por:</span>
            <Button
              variant={filter === "next" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("next")}
            >
              Próximas etapas
            </Button>
            <Button
              variant={filter === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("history")}
            >
              Historial
            </Button>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Mostrar todas
            </Button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Select
              onValueChange={handleStageChange}
              value={selectedStage || undefined}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecciona etapa" />
              </SelectTrigger>
              <SelectContent>
                {filteredStages.length > 0 ? (
                  filteredStages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-muted-foreground p-2">
                    No hay etapas disponibles
                  </div>
                )}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              variant="default"
              onClick={handleMoveCandidate}
              disabled={!selectedStage}
            >
              <MoveRight className="w-4 h-4 mr-2" />
              Mover candidato
            </Button>
          </div>
        </div>

        {/* ✅ Próximas etapas */}
        {jobStage.next_possible_stages?.length ? (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Próximas etapas posibles</h3>
            <div className="flex flex-wrap gap-2">
              {jobStage.next_possible_stages.map((stage) => (
                <Badge key={stage.id} variant="outline">
                  {stage.name}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        {/* ✅ Historial de etapas */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Historial de etapas</h3>
          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Etapa</TableHead>
                  <TableHead className="min-w-[120px]">Reclutador</TableHead>
                  <TableHead className="min-w-[200px]">Formulario</TableHead>
                  <TableHead className="min-w-[150px]">Creado</TableHead>
                  <TableHead className="min-w-[150px]">Actualizado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobStage.stage_history?.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>{history.stage_name}</TableCell>
                    <TableCell>{history.recruiter?.name || "-"}</TableCell>
                    <TableCell>
                      {history.scoreboards && history.scoreboards.length > 0
                        ? history.scoreboards.map((s) => (
                            <div key={s.id} className="text-xs mb-1">
                              <strong>{s.template.name}</strong>
                              {s.entries &&
                                Object.entries(s.entries)
                                  .filter(
                                    ([_, value]) =>
                                      value !== "null" && value !== null
                                  )
                                  .map(([key, value]) => (
                                    <div key={key}>
                                      <span className="font-semibold">
                                        {key}:
                                      </span>{" "}
                                      {value as string}
                                    </div>
                                  ))}
                            </div>
                          ))
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(history.created_at), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(history.updated_at), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
