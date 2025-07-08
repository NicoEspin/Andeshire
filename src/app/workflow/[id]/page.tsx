"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";

import WorkflowCanvas from "./WorkflowCanvas";
import { fetchWorkflowDetail } from "@/state/api/Workflows/Id/fetchWorfkflowDetail";

export default function WorkflowDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { workflow, loading, error } = useSelector(
    (state: RootState) => state.workflowDetail
  );

  useEffect(() => {
    fetchWorkflowDetail(dispatch);
  }, [dispatch]);

  if (loading) return <div className="p-4">Cargando workflow...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!workflow) return null;

  return (
    <div className="flex h-full w-full overflow-hidden">
      <WorkflowCanvas
        stages={workflow.stages}
        templateSet={workflow.template_set}
      />
    </div>
  );
}
