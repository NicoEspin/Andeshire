import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setJob,
  setStages,
  setCandidatesByStage,
  setLoading,
  setError,
} from "@/store/slices/JobSlice";

export const fetchJobById = async (_jobId: string, dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await api.get("/");

    console.log("API Response:", response.data);

    const jobData = response.data.job || response.data;

    dispatch(setJob(jobData));
    dispatch(setStages(response.data.stages || []));
    dispatch(setCandidatesByStage(response.data.candidates_by_stage || []));
  } catch (error: any) {
    console.error("API Error:", error);

    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      dispatch(setError("Network error - please check your connection"));
    } else {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to load job";
      dispatch(setError(errorMessage));
    }
  } finally {
    dispatch(setLoading(false));
  }
};
