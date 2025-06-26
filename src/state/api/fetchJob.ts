// src/api/fetchJob.ts (o src/state/api/fetchJob.ts según tu estructura)
import api from "@/app/lib/axios";
import { AppDispatch } from "@/app/redux";
import { setJob, setLoading, setError } from "@/store/slices/JobSlice";

export const fetchJobById = async (jobId: string, dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    // URL corregida sin salto de línea y usando ruta relativa
    const response = await api.get(`/mock/job_detail/${jobId}/`);
    
    // Verificar la estructura de la respuesta
    console.log("API Response:", response.data);
    
    // Ajustar según la estructura real de la respuesta
    const jobData = response.data.job || response.data;
    dispatch(setJob(jobData));
    
  } catch (error: any) {
    console.error("API Error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Failed to load job";
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};