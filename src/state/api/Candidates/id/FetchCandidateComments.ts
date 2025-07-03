// src/state/api/Candidates/FetchCandidateComments.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setCandidateCommentsLoading,
  setCandidateCommentsError,
  setCandidateComments,
} from "@/store/slices/candidates/id/CandidateCommentsSlice";
import { CandidateCommentsResponse } from "@/app/jobs/[id]/types/CandidateCommentsTypes";

export const fetchCandidateComments = async (
  dispatch: AppDispatch,
  // candidateId?: string // si luego necesitas pasar un id para filtrar
) => {
  dispatch(setCandidateCommentsLoading(true));
  try {
    const response = await api.get<CandidateCommentsResponse>(
      `/candidate-comments`
    );
    dispatch(setCandidateComments(response.data));
    dispatch(setCandidateCommentsLoading(false));
  } catch (error: any) {
    dispatch(setCandidateCommentsError(error.message));
    dispatch(setCandidateCommentsLoading(false));
  }
};
