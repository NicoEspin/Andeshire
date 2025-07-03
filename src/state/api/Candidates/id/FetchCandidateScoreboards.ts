// src/state/api/Candidates/FetchCandidateScoreboards.ts

import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setCandidateScoreboardsLoading,
  setCandidateScoreboardsError,
  setCandidateScoreboards,
} from "@/store/slices/candidates/id/CandidateScoreboardsSlice";
import { CandidateScoreboardsResponse } from "@/app/jobs/[id]/types/ScoreboardsTypes";


export const fetchCandidateScoreboards = async (
  dispatch: AppDispatch,
  candidateId: string
) => {
  dispatch(setCandidateScoreboardsLoading(true));
  try {
    const response = await api.get<CandidateScoreboardsResponse>(
      `/candidate-scoreboards`
    );
    dispatch(setCandidateScoreboards(response.data));
    dispatch(setCandidateScoreboardsLoading(false));
  } catch (error: any) {
    dispatch(setCandidateScoreboardsError(error.message));
    dispatch(setCandidateScoreboardsLoading(false));
  }
};
