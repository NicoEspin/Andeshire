"use client";

import React from "react";
import {
  ActivitySquare,
  BarChart3,
  Briefcase,
  Building2,
  Clock,
  ListChecks,
  TrendingUp,
  Users,
} from "lucide-react";
import mockDashboard from "./data/mockdashboard.json";
import KPICards from "./components/KPICards";
import ActivityTimeline from "./components/ActivityTimeline";
import CandidatesPerStage from "./components/CandidatesPerStage";
import CandidatesByCategory from "./components/CandidatesByCategory";
import CategoriesOverTime from "./components/CategoriesOverTime";
import CandidatesPerJob from "./components/CandidatesPerJob";
import JobsPerCompany from "./components/JobsPerCompany";
import JobsByCategory from "./components/JobsByCategory";
import RecentsCandidatesList from "./components/RecentsCandidatesList";
import RecentsJobsList from "./components/RecentsJobsList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
  const t = useTranslations("Dashboard");
  const { metrics, categories_data, analytics, recent_data } = mockDashboard;

  return (
    <div className="p-6 space-y-10 pb-10">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICards metrics={metrics} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(300px,_auto)]">
        <Card className="p-4 col-span-2 row-span-2 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <ActivitySquare className="w-5 h-5 text-muted-foreground" />
              {t("activityTimeline")}
            </h2>
          </CardHeader>
          <ActivityTimeline data={categories_data.total_timeline} />
        </Card>

        <Card className="p-4 row-span-2 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <ListChecks className="w-5 h-5 text-muted-foreground" />
              {t("candidatesByStage")}
            </h2>
          </CardHeader>
          <CandidatesPerStage data={analytics.stages} />
        </Card>

        <Card className="p-4 row-span-2 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
              {t("candidatesByJob")}
            </h2>
          </CardHeader>
          <CandidatesPerJob data={analytics.candidates_per_job} />
        </Card>

        <Card className="p-4 col-span-2 row-span-2 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              {t("candidatesByCategory")}
            </h2>
          </CardHeader>
          <CardContent>
            <CandidatesByCategory
              data={categories_data.candidates_by_category}
            />
          </CardContent>
        </Card>

        <Card className="p-4 col-span-1 md:col-span-2 row-span-2 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              {t("categoriesOverTime")}
            </h2>
          </CardHeader>
          <CategoriesOverTime data={categories_data.categories_timeline} />
        </Card>

        <Card className="p-4 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              {t("jobsPerCompany")}
            </h2>
          </CardHeader>
          <JobsPerCompany data={analytics.jobs_per_company} />
        </Card>

        <Card className="p-4 rounded-xl shadow-md">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
              {t("jobsByCategory")}
            </h2>
          </CardHeader>
          <JobsByCategory data={analytics.jobs_by_category} />
        </Card>

        <div className="flex flex-col md:flex-row gap-6 col-span-3">
          <Card className="p-4 rounded-xl shadow-md w-full">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              {t("recentCandidates")}
            </h2>
            <RecentsCandidatesList candidates={recent_data.candidates} />
          </Card>

          <Card className="p-4 rounded-xl shadow-md w-full">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              {t("recentJobs")}
            </h2>
            <RecentsJobsList jobs={recent_data.jobs} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
