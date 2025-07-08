"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Stage } from "../../types/StagesTypes";
import { CandidatesByStage } from "../../types/CandidatesByStagesTypes";
import TableView from "./TableView";
import KanbanView from "./KanbanView";
import { moveCandidate } from "@/store/slices/JobSlice";
import type { DropResult } from "@hello-pangea/dnd";

import {
  Table as TableIcon,
  Settings,
  History,
  Search,
  Kanban,
} from "lucide-react";
import { useAppDispatch } from "@/app/redux";
import TableConfiguration from "./TableConfiguration";
import { useTranslations } from "next-intl";

interface CandidatesViewProps {
  stages: Stage[];
  candidateByStage: CandidatesByStage;
}

export type TableColumnsVisibility = {
  Nombre: boolean;
  Email: boolean;
  Etapa: boolean;
  "Fecha de aplicación": boolean;
  Match: boolean;
  Compensación: boolean;
  "Estado en otros procesos": boolean;
};

const CandidatesView = ({ stages, candidateByStage }: CandidatesViewProps) => {
  const t = useTranslations("JobId.Candidates");
  const dispatch = useAppDispatch();
  const [view, setView] = useState<"table" | "kanban">("kanban");
  const [search, setSearch] = useState("");
  const [onlyValidStages, setOnlyValidStages] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [columns, setColumns] = useState<TableColumnsVisibility>({
    Nombre: true,
    Email: true,
    Etapa: true,
    "Fecha de aplicación": true,
    Match: true,
    Compensación: true,
    "Estado en otros procesos": true,
  });

  const candidatesCount = Object.values(candidateByStage).reduce(
    (total, candidates) => total + candidates.length,
    0
  );

  const handleDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;

      dispatch(
        moveCandidate({
          candidateId: draggableId,
          sourceStageId: source.droppableId,
          destinationStageId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          type: "REORDER",
        })
      );
    } else {
      dispatch(
        moveCandidate({
          candidateId: draggableId,
          sourceStageId: source.droppableId,
          destinationStageId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          type: "MOVE_STAGE",
        })
      );
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-800">
          {t("Title")}{" "}
          <span className="text-gray-500">({candidatesCount})</span>
        </h2>

        {/* Vista Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "ghost"}
            onClick={() => setView("table")}
            className={cn(
              "flex items-center gap-1 rounded-md",
              view === "table" && "bg-purple-600 text-white"
            )}
          >
            <TableIcon className="w-4 h-4" />
            {t("Table")}
          </Button>
          <Button
            variant={view === "kanban" ? "default" : "ghost"}
            onClick={() => setView("kanban")}
            className={cn(
              "flex items-center gap-1 rounded-md",
              view === "kanban" && "bg-purple-600 text-white"
            )}
          >
            <Kanban className="w-4 h-4" />
            {t("Kanban")}
          </Button>
        </div>

        {/* Controles */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t("SearchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-60"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={onlyValidStages}
              onCheckedChange={setOnlyValidStages}
              className="bg-purple-600"
            />
            <span className="text-sm text-gray-700">
              {t("OnlyValidStages")}
            </span>
          </div>

          {view === "table" && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-sm text-gray-600"
              onClick={() => setShowConfig(true)}
            >
              <Settings className="w-4 h-4" />
              {t("ConfigureColumns")}
            </Button>
          )}

          {view === "table" && (
            <TableConfiguration
              open={showConfig}
              setOpen={setShowConfig}
              columns={columns}
              setColumns={setColumns}
            />
          )}

          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <History className="w-4 h-4" />
            {t("TaskHistory")}
          </Button>
        </div>
      </div>

      {/* Vista dinámico */}
      <div>
        {view === "table" ? (
          <TableView
            stages={stages}
            candidatesByStage={candidateByStage}
            visibleColumns={columns}
          />
        ) : (
          <KanbanView
            stages={stages}
            candidatesByStage={candidateByStage}
            onDragEndHandler={handleDragEnd}
          />
        )}
      </div>
    </div>
  );
};

export default CandidatesView;
