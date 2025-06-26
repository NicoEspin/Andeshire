"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Plus,
  GripVertical,
  Mail,
  Phone,
  Star,
  Search,
  Download,
  Table,
  Kanban,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Link from "next/link";

// Definir las columnas del Kanban
const kanbanColumns = [
  {
    id: "portal",
    title: "Candidato desde el Portal",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "manual",
    title: "Vinculado Manualmente sin acciones",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
  {
    id: "whatsapp",
    title: "Disparador Mensaje Whatsapp",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "interview-gen",
    title: "Disparador de Agente generador entrevista",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "pending-screening",
    title: "Pending for Screening",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: "screened",
    title: "Screened",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    id: "presented",
    title: "Presentado al Partner",
    color: "bg-pink-100 text-pink-800 border-pink-200",
  },
  {
    id: "tech-scheduled",
    title: "Tech - Interview Scheduled",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  {
    id: "tech-approved",
    title: "Aprobado Tech (Partner) Waiting for final client interview",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "final-interview",
    title: "Final Client interview",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    id: "offer-discussion",
    title: "Offer Discusion",
    color: "bg-violet-100 text-violet-800 border-violet-200",
  },
  {
    id: "hire",
    title: "Hire (Ingreso)",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "rejected-recruiter",
    title: "Rejected by recruiter",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "rejected-partner",
    title: "Rejected by Partner",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "dropout",
    title: "Candidate Dropout",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "rejected-client",
    title: "Rejected by Final Client",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "on-hold",
    title: "On Hold",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

// Mock data para candidatos en diferentes etapas
const initialCandidates = {
  portal: [
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 88,
      appliedDate: "2025-01-16",
      location: "Buenos Aires",
    },
  ],
  manual: [
    {
      id: "2",
      name: "Pedro Vassena",
      email: "pedro.vassena@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 92,
      appliedDate: "2025-01-15",
      location: "Argentina",
    },
    {
      id: "3",
      name: "Sebastian Lionel Meglio",
      email: "sebastian.meglio@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 85,
      appliedDate: "2025-01-14",
      location: "Argentina",
    },
  ],
  screened: [
    {
      id: "4",
      name: "María López",
      email: "maria.lopez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 90,
      appliedDate: "2025-01-13",
      location: "Córdoba",
    },
  ],
  "rejected-recruiter": [
    {
      id: "5",
      name: "Federico Barabasch",
      email: "federico.barabasch@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 65,
      appliedDate: "2025-01-12",
      location: "Argentina",
    },
  ],
};

interface KanbanViewProps {
  searchTerm?: string;
  stageFilter?: string;
  viewMode?: "table" | "kanban";
  onViewModeChange?: (mode: "table" | "kanban") => void;
}

export function KanbanView({
  searchTerm = "",
  stageFilter = "all",
  viewMode = "kanban",
  onViewModeChange,
}: KanbanViewProps) {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localStageFilter, setLocalStageFilter] = useState(stageFilter);
  const [internalViewMode, setInternalViewMode] = useState<"table" | "kanban">(
    "kanban"
  );

  // Use local state if no props provided
  const activeSearchTerm = searchTerm || localSearchTerm;
  const activeStageFilter = stageFilter || localStageFilter;

  // Filter candidates based on search term and stage filter
  const filteredCandidates = Object.keys(candidates).reduce((acc, columnId) => {
    const columnCandidates = candidates[columnId] || [];

    const filtered = columnCandidates.filter((candidate) => {
      const matchesSearch =
        activeSearchTerm === "" ||
        candidate.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(activeSearchTerm.toLowerCase());

      const matchesStage =
        activeStageFilter === "all" || columnId === activeStageFilter;

      return matchesSearch && (activeStageFilter === "all" || matchesStage);
    });

    acc[columnId] = filtered;
    return acc;
  }, {});

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordenar dentro de la misma columna
      const columnCandidates = Array.from(candidates[source.droppableId] || []);
      const [reorderedItem] = columnCandidates.splice(source.index, 1);
      columnCandidates.splice(destination.index, 0, reorderedItem);

      setCandidates({
        ...candidates,
        [source.droppableId]: columnCandidates,
      });
    } else {
      // Mover entre columnas
      const sourceColumn = Array.from(candidates[source.droppableId] || []);
      const destColumn = Array.from(candidates[destination.droppableId] || []);
      const [movedItem] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, movedItem);

      setCandidates({
        ...candidates,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700";
    if (score >= 60) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - Only show if no external controls */}
      {!onViewModeChange && (
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Candidatos</h2>
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={internalViewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInternalViewMode("table")}
                  className="h-8 px-3"
                >
                  <Table className="h-4 w-4 mr-1" />
                  Tabla
                </Button>
                <Button
                  variant={internalViewMode === "kanban" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInternalViewMode("kanban")}
                  className="h-8 px-3"
                >
                  <Kanban className="h-4 w-4 mr-1" />
                  Kanban
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar candidatos..."
                  className="pl-10 w-64"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={localStageFilter}
                onValueChange={setLocalStageFilter}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las etapas</SelectItem>
                  <SelectItem value="manual">Vinculado Manualmente</SelectItem>
                  <SelectItem value="portal">Desde Portal</SelectItem>
                  <SelectItem value="whatsapp">Mensaje Whatsapp</SelectItem>
                  <SelectItem value="interview-gen">
                    Agente generador
                  </SelectItem>
                  <SelectItem value="pending-screening">
                    Pending Screening
                  </SelectItem>
                  <SelectItem value="screened">Screened</SelectItem>
                  <SelectItem value="presented">Presentado Partner</SelectItem>
                  <SelectItem value="tech-scheduled">Tech Interview</SelectItem>
                  <SelectItem value="tech-approved">Tech Aprobado</SelectItem>
                  <SelectItem value="final-interview">
                    Final Interview
                  </SelectItem>
                  <SelectItem value="offer-discussion">
                    Offer Discussion
                  </SelectItem>
                  <SelectItem value="hire">Hire</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Exportar candidatos")}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {internalViewMode === "table" ? (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Etapa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Fecha de aplicación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Match
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Compensación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Estado en otros procesos
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Mock table data - you can use the same data structure as in candidates-table */}
                  {Object.values(filteredCandidates)
                    .flat()
                    .map((candidate, index) => (
                      <tr
                        key={candidate.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/candidates/${candidate.id}?view=process-stages`}
                            className="flex items-center gap-3 hover:underline cursor-pointer"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={candidate.avatar || "/placeholder.svg"}
                                alt={candidate.name}
                              />
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-gray-900 text-sm">
                              {candidate.name}
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {candidate.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-medium">
                            {/* You'll need to map the column ID to a readable stage name */}
                            Stage
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(candidate.appliedDate).toLocaleDateString(
                              "es-ES"
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={`${getScoreColor(
                              candidate.score
                            )} text-xs font-medium`}
                          >
                            {candidate.score}% match
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            $70,000 - $90,000
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            Sin otros procesos
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Existing Kanban content here
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="w-full h-full overflow-x-auto border border-gray-200 rounded-lg bg-white">
              <div
                className="flex gap-4 p-4 min-w-max h-full"
                style={{ minWidth: "calc(17 * 320px)" }}
              >
                {kanbanColumns
                  .filter(
                    (column) =>
                      activeStageFilter === "all" ||
                      column.id === activeStageFilter
                  )
                  .map((column) => (
                    <div
                      key={column.id}
                      className="flex-shrink-0 min-w-[280px] w-80 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      {/* Column Header */}
                      <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <h3
                            className="font-semibold text-gray-900 text-sm truncate"
                            title={column.title}
                          >
                            {column.title}
                          </h3>
                          <Badge
                            className={`${column.color} font-medium text-xs`}
                          >
                            {filteredCandidates[column.id]?.length || 0}
                          </Badge>
                        </div>
                      </div>

                      {/* Droppable Area */}
                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`p-3 min-h-[200px] transition-colors duration-200 ${
                              snapshot.isDraggingOver ? "bg-blue-50" : ""
                            }`}
                          >
                            <div className="h-[500px] overflow-y-auto">
                              <div className="space-y-3 pr-2">
                                {/* Add Candidate Button */}
                                <Button
                                  variant="outline"
                                  className="w-full h-12 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-all duration-300"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Agregar candidato
                                </Button>

                                {/* Candidates */}
                                {filteredCandidates[column.id]?.map(
                                  (candidate, index) => (
                                    <Draggable
                                      key={candidate.id}
                                      draggableId={candidate.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className={`transition-all duration-200 ${
                                            snapshot.isDragging
                                              ? "rotate-2 shadow-lg"
                                              : ""
                                          }`}
                                        >
                                          <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                                            <CardContent className="p-4">
                                              <div className="space-y-3">
                                                {/* Drag Handle & Header */}
                                                <div className="flex items-start justify-between gap-2">
                                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <div
                                                      {...provided.dragHandleProps}
                                                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing"
                                                    >
                                                      <GripVertical className="h-4 w-4 text-gray-400" />
                                                    </div>
                                                    <Link
                                                      href={`/candidates/${candidate.id}?view=process-stages`}
                                                      className="flex items-center gap-3 hover:underline cursor-pointer"
                                                    >
                                                      <Avatar className="h-8 w-8 flex-shrink-0">
                                                        <AvatarImage
                                                          src={
                                                            candidate.avatar ||
                                                            "/placeholder.svg"
                                                          }
                                                          alt={candidate.name}
                                                        />
                                                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                                          {candidate.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .toUpperCase()}
                                                        </AvatarFallback>
                                                      </Avatar>
                                                      <div className="">
                                                        <h4 className="font-medium text-gray-900 text-sm truncate">
                                                          {candidate.name}
                                                        </h4>
                                                      </div>
                                                    </Link>
                                                    <div className="flex-1 min-w-0">
                                                      <p className="text-xs text-gray-500 truncate">
                                                        {candidate.email}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <Badge
                                                    className={`${getScoreColor(
                                                      candidate.score
                                                    )} text-xs flex-shrink-0`}
                                                  >
                                                    <Star className="h-3 w-3 mr-1" />
                                                    {candidate.score}
                                                  </Badge>
                                                </div>

                                                {/* Details */}
                                                <div className="text-xs text-gray-600">
                                                  <div>
                                                    📍 {candidate.location}
                                                  </div>
                                                  <div>
                                                    📅{" "}
                                                    {new Date(
                                                      candidate.appliedDate
                                                    ).toLocaleDateString(
                                                      "es-ES"
                                                    )}
                                                  </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0"
                                                  >
                                                    <Mail className="h-3 w-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-0"
                                                  >
                                                    <Phone className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                              </div>
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
              </div>
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
