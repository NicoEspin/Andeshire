// src/store/slices/JobSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definir el tipo de Job basado en la API
export interface Job {
  id: string;
  title: string;
  description: string;
  company?: string;
  location?: string;
  salary?: string;
  requirements?: string[];
  // Agregar más campos según la respuesta real de la API
}

interface JobState {
  job: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  job: null,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<Job>) => {
      state.job = action.payload;
      state.error = null; // Limpiar error al cargar exitosamente
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false; // Parar loading al tener error
    },
    clearJob: (state) => {
      state.job = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setJob, setLoading, setError, clearJob } = jobSlice.actions;
export default jobSlice.reducer;