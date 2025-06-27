// src/store/slices/JobSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/app/jobs/[id]/types/JobTypes";
import type { Stage } from "@/app/jobs/[id]/types/StagesTypes";
import type {
  CandidatesByStage,
  CandidateDetail,
} from "@/app/jobs/[id]/types/CandidatesByStagesTypes";

// Estado del slice
interface JobState {
  job: Job | null;
  stages: Stage[];
  candidatesByStage: CandidatesByStage;
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  job: null,
  stages: [],
  candidatesByStage: {},
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<Job>) => {
      state.job = action.payload;
      state.error = null;
    },
    setStages: (state, action: PayloadAction<Stage[]>) => {
      state.stages = action.payload;
    },
    setCandidatesByStage: (state, action: PayloadAction<CandidatesByStage>) => {
      state.candidatesByStage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearJob: (state) => {
      state.job = null;
      state.stages = [];
      state.candidatesByStage = {};
      state.loading = false;
      state.error = null;
    },

    // ✅ Nuevo reducer para mover candidatos entre etapas
    moveCandidate: (
      state,
      action: PayloadAction<{
        candidateId: string;
        sourceStageId: string;
        destinationStageId: string;
        sourceIndex: number;
        destinationIndex: number;
        type: "REORDER" | "MOVE_STAGE";
      }>
    ) => {
      const {
        candidateId,
        sourceStageId,
        destinationStageId,
        sourceIndex,
        destinationIndex,
        type,
      } = action.payload;

      if (type === "REORDER" && sourceStageId === destinationStageId) {
        const list = state.candidatesByStage[sourceStageId];
        const reordered = Array.from(list);
        const [moved] = reordered.splice(sourceIndex, 1);
        reordered.splice(destinationIndex, 0, moved);
        state.candidatesByStage[sourceStageId] = reordered;
      }

      if (type === "MOVE_STAGE") {
        const sourceList = Array.from(state.candidatesByStage[sourceStageId]);
        const destList = Array.from(
          state.candidatesByStage[destinationStageId] || []
        );

        const [moved] = sourceList.splice(sourceIndex, 1);

        const updatedCandidate: CandidateDetail = {
          ...moved,
          current_stage: {
            id: destinationStageId,
            name:
              state.stages.find((s) => s.id === destinationStageId)?.name || "",
            order: 0,
            status_options: [],
          },
        };

        destList.splice(destinationIndex, 0, updatedCandidate);

        state.candidatesByStage[sourceStageId] = sourceList;
        state.candidatesByStage[destinationStageId] = destList;
      }
    },
  },
});

export const {
  setJob,
  setStages,
  setCandidatesByStage,
  setLoading,
  setError,
  clearJob,
  moveCandidate, // ✅ ¡No olvides exportarlo!
} = jobSlice.actions;

export default jobSlice.reducer;
