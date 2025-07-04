import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setCandidateMeetingsLoading,
  setCandidateMeetingsError,
  setCandidateMeetings,
} from "@/store/slices/candidates/id/CandidateMeetingsSlice";
import { CandidateMeetingsResponse } from "@/app/jobs/[id]/types/CandidateMeetingsTypes";


export const fetchCandidateMeetings = async (
  dispatch: AppDispatch,
  // candidateId?: string // Para futuro soporte de ID dinámico
) => {
  dispatch(setCandidateMeetingsLoading(true));
  try {
    const response = await api.get<CandidateMeetingsResponse>(
      `/meetings-candidate`
      // Si luego quieres usar ID dinámico: `/meetings-candidate/${candidateId}`
    );
    dispatch(setCandidateMeetings(response.data));
    dispatch(setCandidateMeetingsLoading(false));
  } catch (error: any) {
    dispatch(setCandidateMeetingsError(error.message));
    dispatch(setCandidateMeetingsLoading(false));
  }
};
