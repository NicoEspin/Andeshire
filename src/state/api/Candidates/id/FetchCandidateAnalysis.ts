// src/state/api/Candidates/FetchCandidateAnalysis.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setCandidateAnalysesLoading,
  setCandidateAnalysesError,
  setCandidateAnalyses,
} from "@/store/slices/candidates/id/CandidateAnalysisSlice";
import { CandidateAnalysesResponse } from "@/app/jobs/[id]/types/CandidateAnalysisTypes";

export const fetchCandidateAnalyses = async (
  dispatch: AppDispatch,
//   candidateId: string // si luego lo necesitas por id
) => {
  dispatch(setCandidateAnalysesLoading(true));
  try {
    const response = await api.get<CandidateAnalysesResponse>(
      `/candidate-analysis` // ajusta tu endpoint real
    );
    dispatch(setCandidateAnalyses(response.data));
    dispatch(setCandidateAnalysesLoading(false));
  } catch (error: any) {
    dispatch(setCandidateAnalysesError(error.message));
    dispatch(setCandidateAnalysesLoading(false));
  }
};
