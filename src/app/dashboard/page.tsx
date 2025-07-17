import React from "react";
import mockDashboard from "./data/mockdashboard.json";
import KPICards from "./components/KPICards";
import ActivityTimeline from "./components/ActivityTimeline";
import CandidatesPerStage from "./components/CandidatesPerStage";
import CandidatesByCategory from "./components/CandidatesByCategory";
import CategoriesOverTime from "./components/CategoriesOverTime";
import CandidatesPerJob from "./components/CandidatesPerJob";
import JobsPerCompany from "./components/JobsPerCompany";
import JobsByCategory from "./components/JobsByCategory";
import RecentsList from "./components/RecentsList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardPage = () => {
  const { metrics, categories_data, analytics, recent_data } = mockDashboard;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICards metrics={metrics} />
      </div>

      {/* BentoGrid personalizada */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 auto-rows-[minmax(300px,_auto)]">
        <Card className="p-4 col-span-2 row-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold mb-2">
              📈 Timeline de Actividad
            </h2>
          </CardHeader>
          <ActivityTimeline data={categories_data.total_timeline} />
        </Card>

        <Card className="rounded-xl p-4 shadow-sm row-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold mb-2">
              🧭 Candidatos por etapa
            </h2>
          </CardHeader>
          <CandidatesPerStage data={analytics.stages} />
        </Card>

        <Card className=" rounded-xl p-4 shadow-sm row-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold mb-2">
              🧑‍💼 Candidatos por trabajo
            </h2>
          </CardHeader>
          <CandidatesPerJob data={analytics.candidates_per_job} />
        </Card>
        <Card className=" rounded-xl shadow-sm row-span-2 col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold mb-2">
              📊 Candidatos por categoría
            </h2>
          </CardHeader>
          <CardContent>
            <CandidatesByCategory
              data={categories_data.candidates_by_category}
            />
          </CardContent>
        </Card>

        <div className="bg-muted rounded-xl p-4 shadow-sm col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            ⏳ Evolución por categoría
          </h2>
          <CategoriesOverTime />
        </div>
        <div className="bg-muted rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">
            🏢 Trabajos por empresa
          </h2>
          <JobsPerCompany />
        </div>

        <div className="bg-muted rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">
            🧩 Trabajos por categoría
          </h2>
          <JobsByCategory />
        </div>

        <div className="bg-muted rounded-xl p-4 shadow-sm col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">🆕 Recientes</h2>
          <RecentsList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
