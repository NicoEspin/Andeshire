
import api from "@/lib/axios";
import { AppDispatch } from "@/app/redux";
import {
  setCandidate,
  setLoading,
  setError,
} from "@/store/slices/CandidateDetailSlice";

export const fetchCandidateById = async (candidateId: string, dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await api.get("/candidate-detail", {
      params: { id: candidateId },
    });

    console.log("API Response:", response.data);

    dispatch(setCandidate(response.data.candidate));
  } catch (error: any) {
    console.error("API Error:", error);

    if (error.code === "ERR_NETWORK" || error.message.includes("CORS")) {
      dispatch(setError("Network error - please check your connection"));
    } else {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to load candidate";
      dispatch(setError(errorMessage));
    }
  } finally {
    dispatch(setLoading(false));
  }
};
