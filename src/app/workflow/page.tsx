"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";

import WorkflowsTable from "./WorkflowsTable";
import { Card, CardContent } from "@/components/ui/card";
import { fetchWorkflowList } from "@/state/api/Workflows/fetchWorkflowList";

export default function WorkflowList() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: workflows, loading, error } = useSelector(
    (state: RootState) => state.workflowList
  );

  useEffect(() => {
    dispatch(fetchWorkflowList);
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-8">Cargando workflows...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <Card className="mr-8">
      <CardContent>
        <WorkflowsTable workflows={workflows} />
      </CardContent>
    </Card>
  );
}
