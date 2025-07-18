"use client";

import { AppDispatch, RootState } from "@/app/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWorkflowList } from "@/state/api/Workflows/fetchWorkflowList";
import WorkflowsTable from "./WorkflowsTable";

export default function WorkflowList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: workflows,
    loading,
    error,
  } = useSelector((state: RootState) => state.workflowList);

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
    <div className="mr-8">
      <WorkflowsTable workflows={workflows} />
    </div>
  );
}
