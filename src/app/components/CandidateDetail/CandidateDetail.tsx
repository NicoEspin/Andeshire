"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { fetchCandidateById } from "@/state/api/fetchCandidateById";
import { clearCandidate } from "@/store/slices/CandidateDetailSlice";
import { Button } from "@/components/ui/button";
import CandidateActions from "./CandidateActions/CandidateActions";
import CandidateHeader from "./CandidateHeader";
import CandidateContentRender from "./CandidateContentRender";

interface CandidateDetailProps {
  candidateId: string;
  onClose: () => void;
}

export default function CandidateDetail({
  candidateId,
  onClose,
}: CandidateDetailProps) {
  const dispatch = useAppDispatch();

  const { candidate, loading, error } = useAppSelector(
    (state) => state.candidateDetail
  );

  useEffect(() => {
    if (candidateId) {
      fetchCandidateById(candidateId, dispatch);
    }

    return () => {
      dispatch(clearCandidate());
    };
  }, [candidateId, dispatch]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
          <h2 className="text-xl font-semibold">Cargando candidato...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-fit">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
          <h2 className="text-xl font-semibold text-red-600">Error:</h2>
          <p>{error}</p>
          <Button onClick={onClose} className="mt-4">
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return null; // Espera a que se cargue
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 p-10 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-6xl space-y-4 overflow-auto">
        <CandidateActions onClose={onClose} candidate={candidate} />
        <CandidateHeader candidate={candidate} />
        <CandidateContentRender candidate={candidate} />
      </div>
    </div>
  );
}
