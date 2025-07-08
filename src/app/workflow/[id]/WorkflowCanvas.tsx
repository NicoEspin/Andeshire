"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
  BackgroundVariant,
  MarkerType,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import WorkflowNode from "./components/WorkflowNode";
import { nodeColors } from "@/lib/nodeColors";
import WorkflowSidebar from "./components/WorkflowSidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TemplateSet } from "@/app/Types/Workflow/WorkflowDetailTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddNewStage } from "./components/AddNewStage";

type WorkflowCanvasProps = {
  stages: Stage[];
  templateSet: TemplateSet;
};

type Stage = {
  id: string;
  name: string;
  description: string;
  order: number;
  actions?: any;
  status_options?: any;
  next_possible_stages?: string[];
  color?: string;
};

export default function WorkflowCanvas({
  stages: initialStages,
  templateSet,
}: WorkflowCanvasProps) {
  const [stages, setStages] = useState<Stage[]>(initialStages);

  // 👉 Genera nodos iniciales solo una vez
  const childMap: Record<string, string[]> = {};
  const parentMap: Record<string, string[]> = {};

  initialStages.forEach((stage) => {
    stage.next_possible_stages?.forEach((childId) => {
      if (!childMap[stage.id]) childMap[stage.id] = [];
      childMap[stage.id].push(childId);

      if (!parentMap[childId]) parentMap[childId] = [];
      parentMap[childId].push(stage.id);
    });
  });

  const allChildren = new Set(
    initialStages.flatMap((stage) => stage.next_possible_stages || [])
  );
  const roots = initialStages.filter((stage) => !allChildren.has(stage.id));

  const positionedNodes: Node[] = [];
  const visited = new Set<string>();

  const spacingX = 300;
  const spacingY = 200;
  const offsetY = 100;

  function positionNode(nodeId: string, level: number, x: number) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const stageIndex = initialStages.findIndex((s) => s.id === nodeId);
    const nodeColor =
      initialStages[stageIndex].color ||
      nodeColors[stageIndex % nodeColors.length];

    const stage = initialStages[stageIndex];

    positionedNodes.push({
      id: nodeId,
      type: "customNode",
      position: { x, y: offsetY + level * spacingY },
      data: {
        id: nodeId,
        label: stage.name,
        description: stage.description,
        actions: stage.actions,
        statusOptions: stage.status_options,
        color: nodeColor,
        onDelete: handleDeleteStage,
      },
    });

    const children = childMap[nodeId] || [];
    if (children.length === 1) {
      positionNode(children[0], level + 1, x);
    } else if (children.length > 1) {
      children.forEach((childId, index) => {
        const childX =
          x + (index - (children.length - 1) / 2) * spacingX;
        positionNode(childId, level + 1, childX);
      });
    }
  }

  roots.forEach((root, index) => {
    const rootX = (index - (roots.length - 1) / 2) * spacingX;
    positionNode(root.id, 0, rootX);
  });

  const initialNodes: Node[] = positionedNodes;

  const initialEdges: Edge[] = initialStages.flatMap((stage) =>
    stage.next_possible_stages?.map((targetId) => {
      const stageIndex = initialStages.findIndex((s) => s.id === stage.id);
      const edgeColor = nodeColors[stageIndex % nodeColors.length];
      return {
        id: `${stage.id}-${targetId}`,
        source: stage.id,
        target: targetId,
        style: { stroke: edgeColor, strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed as const },
      } satisfies Edge;
    }) || []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function handleDeleteStage(stageId: string) {
    setNodes((prev) => prev.filter((node) => node.id !== stageId));
    setEdges((prev) =>
      prev.filter(
        (edge) => edge.source !== stageId && edge.target !== stageId
      )
    );
    setStages((prev) => prev.filter((stage) => stage.id !== stageId));
  }

  const handleAddStage = (newStage: Stage) => {
    const newNode: Node = {
      id: newStage.id,
      type: "customNode",
      position: { x: 0, y: 0 },
      data: {
        id: newStage.id,
        label: newStage.name,
        description: newStage.description,
        actions: newStage.actions,
        statusOptions: newStage.status_options,
        color:
          newStage.color ||
          nodeColors[Math.floor(Math.random() * nodeColors.length)],
        onDelete: handleDeleteStage,
      },
    };

    const newEdges: Edge[] =
      newStage.next_possible_stages?.map((targetId) => ({
        id: `${newStage.id}-${targetId}`,
        source: newStage.id,
        target: targetId,
        style: {
          stroke: String(newNode.data.color || "#333"), // 👈 Forzar string
          strokeWidth: 2,
        },
        markerEnd: { type: MarkerType.ArrowClosed as const },
      })) || [];

    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, ...newEdges]);
    setStages((prev) => [...prev, newStage]);
  };

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="relative flex h-full w-full">
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ customNode: WorkflowNode }}
          fitView
          panOnDrag
        >
          <Card className="absolute top-4 left-4 z-50 w-[300px] shadow-xl border rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between gap-2 p-4 border-b">
              <Link href="/workflows">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </Button>
              </Link>
              <AddNewStage
                onAddStage={handleAddStage}
                existingStages={stages}
              />
            </CardHeader>
            <CardContent className="p-4">
              <WorkflowSidebar templateSet={templateSet} />
            </CardContent>
          </Card>

          <Controls />
          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={(node: Node): string =>
              (node.data?.color as string) || "#999"
            }
          />
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </div>
  );
}
