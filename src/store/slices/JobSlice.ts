// src/store/slices/JobSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definir el tipo de Job basado en la API
// Interfaces auxiliares
interface Company {
  id: string;
  name: string;
}

interface TechnicalRequirements {
  technologies: {
    [key: string]: {
      years: number;
      months: number;
    };
  };
}

interface StageTemplateSet {
  id: string;
  name: string;
}

// Interface principal del Job
interface Job {
  id: string;
  title: string;
  company: Company;
  description: string;
  location: string;
  modality: string;
  technical_requirements: TechnicalRequirements;
  place_id: string;
  visible_id: string;
  stage_template_set: StageTemplateSet;
  technical_info: string;
  questions: string;
  english_level: string;
  category: string;
  created_at: string;
  updated_at: string;
  tech: string;
  priority: string;
  public_title: string;
  public_description: string;
  public_scoreboard_template_id: string;
  is_public: string;
  is_open: string;
  positions: number;
  tags: string[];
  files: any[];
  salary_min: string;
  salary_max: string;
  salary_expected: string;
  currency: string;
  place_of_work: string;
  job_perks: string;
}

// Interface para la respuesta completa de la API
interface JobApiResponse {
  status: string;
  job: Job;
}

// Tipos adicionales que podrían ser útiles
type JobModality = 'Presencial' | 'Remoto' | 'Hibrido';
type JobCategory = 'rrhh' | 'tech' | 'marketing' | 'ventas' | 'finanzas';
type JobPriority = 'low' | 'normal' | 'high' | 'urgent';
type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
type Currency = 'ARS' | 'USD' | 'EUR';

// Interface mejorada con tipos más específicos (opcional)
interface JobTyped extends Omit<Job, 'modality' | 'category' | 'priority' | 'english_level' | 'currency' | 'tech' | 'is_public' | 'is_open'> {
  modality: JobModality;
  category: JobCategory;
  priority: JobPriority;
  english_level: EnglishLevel;
  currency: Currency;
  tech: boolean;
  is_public: boolean;
  is_open: boolean;
}

export type {
  Job,
  JobTyped,
  Company,
  TechnicalRequirements,
  StageTemplateSet,
  JobApiResponse,
  JobModality,
  JobCategory,
  JobPriority,
  EnglishLevel,
  Currency
};


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