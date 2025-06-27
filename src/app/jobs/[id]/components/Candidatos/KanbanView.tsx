"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Stage } from "../../types/StagesTypes";
import { CandidatesByStage } from "../../types/CandidatesByStagesTypes";
import { cn } from "@/lib/utils";

interface KanbanViewProps {
  stages: Stage[];
  candidatesByStage: CandidatesByStage;
  onDragEndHandler?: (result: DropResult) => void;
}

const KanbanView = ({
  stages,
  candidatesByStage,
  onDragEndHandler,
}: KanbanViewProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onDragEndHandler?.(result); // externo si se desea manejar estado global
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-2">
        {stages.map((stage) => (
          <Droppable droppableId={stage.id} key={stage.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "w-80 shrink-0 bg-muted rounded-lg p-3 border",
                  snapshot.isDraggingOver && "bg-purple-50"
                )}
              >
                <h3 className="text-sm font-semibold mb-2">
                  {stage.name}{" "}
                  <span className="text-gray-500 font-normal">
                    ({candidatesByStage[stage.id]?.length || 0})
                  </span>
                </h3>

                {candidatesByStage[stage.id]?.map((candidate, index) => (
                  <Draggable
                    key={candidate.id}
                    draggableId={candidate.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          "mb-3 cursor-pointer",
                          snapshot.isDragging && "border-purple-500 shadow-lg"
                        )}
                      >
                        <CardContent className="p-3 space-y-1">
                          <p className="font-medium text-sm">
                            {candidate.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {candidate.email}
                          </p>
                          <p className="text-xs text-gray-400">
                            {candidate.phone_number || "No hay teléfono."}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(candidate.created_at).toLocaleDateString(
                              "es-AR"
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanView;
