// src/store/slices/Jobs/id/JobApplicantsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApplicantsApiResponse,
  Applicant,
  ApplicantsPagination,
} from "@/app/jobs/[id]/types/ApplicantsTypes";

interface JobApplicantsState {
  jobId: string | null;
  jobTitle: string | null;
  totalApplicants: number;
  applicants: Applicant[];
  pagination: ApplicantsPagination | null;
  loading: boolean;
  error: string | null;
   loaded: boolean
}

const initialState: JobApplicantsState = {
  jobId: null,
  jobTitle: null,
  totalApplicants: 0,
  applicants: [],
  pagination: null,
  loading: false,
  error: null,
  loaded: false
};

export const jobApplicantsSlice = createSlice({
  name: "jobApplicants",
  initialState,
  reducers: {
    clearJobApplicants: (state) => {
      state.jobId = null;
      state.jobTitle = null;
      state.totalApplicants = 0;
      state.applicants = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
    setJobApplicantsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setJobApplicantsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setJobApplicants: (state, action: PayloadAction<ApplicantsApiResponse>) => {
      state.jobId = action.payload.job_id;
      state.jobTitle = action.payload.job_title;
      state.totalApplicants = action.payload.total_applicants;
      state.applicants = action.payload.applicants;
      state.pagination = action.payload.pagination || null;
      state.loaded = true;
    },
    updateApplicantStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      state.applicants = state.applicants.map((applicant) =>
        applicant.id === action.payload.id
          ? { ...applicant, status: action.payload.status }
          : applicant
      );
    },
  },
});

export const {
  clearJobApplicants,
  setJobApplicantsLoading,
  setJobApplicantsError,
  setJobApplicants,
  updateApplicantStatus,
} = jobApplicantsSlice.actions;

export default jobApplicantsSlice.reducer;
