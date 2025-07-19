import api from "@/lib/axios";

export interface DashboardData {
  metrics: {
    total_companies: number;
    total_jobs: number;
    total_candidates: number;
    total_recruiters: number;
    trends: {
      companies_trend: number;
      jobs_trend: number;
      candidates_trend: number;
      recruiters_trend: number;
    };
  };
  recent_data: {
    jobs: Array<{
      id: string;
      title: string;
      company_name: string;
      created_at: string;
    }>;
    candidates: Array<{
      id: string;
      name: string;
      created_at: string;
    }>;
  };
  analytics: {
    candidates_per_job: Array<{
      id: string;
      title: string;
      company_name: string;
      candidate_count: number;
    }>;
    jobs_per_company: Array<{
      id: string;
      name: string;
      job_count: number;
    }>;
    stages: Array<{
      name: string;
      candidate_count: number;
    }>;
    jobs_by_category: Array<{
      category: string;
      count: number;
    }>;
  };
  categories_data: {
    categories: string[];
    candidates_by_category: Array<{
      category: string;
      count: number;
    }>;
    categories_timeline: Record<string, Array<{
      month: string;
      count: number;
    }>>;
    total_timeline: Array<{
      date: string;
      count: number;
    }>;
  };
}

export const fetchDashboard = async (): Promise<DashboardData> => {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Dashboard API Error:", error);
    
    // Fallback to mock data
    const mockDashboard = await import("@/app/dashboard/data/mockdashboard.json");
    return mockDashboard.default;
  }
};