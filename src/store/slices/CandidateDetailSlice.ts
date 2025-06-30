import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes"; // Ajusta la ruta si es distinta

interface CandidateDetailState {
  candidate: CandidateDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: CandidateDetailState = {
  candidate: null,
  loading: false,
  error: null,
};

const candidateDetailSlice = createSlice({
  name: "candidateDetail",
  initialState,
  reducers: {
    setCandidate: (state, action: PayloadAction<CandidateDetail>) => {
      state.candidate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCandidate: (state) => {
      state.candidate = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setCandidate, setLoading, setError, clearCandidate } = candidateDetailSlice.actions;

export default candidateDetailSlice.reducer;
