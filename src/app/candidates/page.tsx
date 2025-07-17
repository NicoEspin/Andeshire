"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCandidateList } from "@/state/api/Candidates/FetchCandidateList";
import CandidatesTable from "./components/CandidatesTable";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { PageLoadingSkeleton } from "@/components/ui/skeleton-variants";
import { LoadingAnnouncer } from "@/components/ui/loading-announcer";

export default function CandidateList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { candidates, loading, error, pagination, filters } = useAppSelector(
    (state) => state.candidateList
  );
  const t = useTranslations("Candidates");
  const [name, setName] = useState("");
  const [jobName, setJobName] = useState("");

  function parseFiltersFromURL(params: Record<string, string>) {
    const parsed: Record<string, any> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (!value || value === "undefined") return;
      if (["companies", "recruiters", "tags"].includes(key)) {
        parsed[key] = value.split(",");
      } else {
        parsed[key] = value;
      }
    });
    return parsed;
  }

  function buildQueryParams(filters: Record<string, any>) {
    const cleaned: Record<string, any> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return;
      cleaned[key] = Array.isArray(value) ? value.join(",") : value;
    });
    return new URLSearchParams(cleaned).toString();
  }

  // 🚀 Efecto: cada cambio en la URL => nuevo fetch
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const parsedFilters = parseFiltersFromURL(params);
    fetchCandidateList(dispatch, parsedFilters);
  }, [dispatch, searchParams.toString()]);

  // 🚀 Handler genérico
  const handleFilterChange = (updated: Record<string, any>) => {
    const current = parseFiltersFromURL(
      Object.fromEntries(searchParams.entries())
    );
    const merged = { ...current, ...updated };
    const query = buildQueryParams(merged);
    router.push(`?${query}`);
  };

  // 🚀 Handlers para Name y Job Name con debounce de 2 segundos
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleFilterChange({ name, job_name: jobName });
    }, 500);

    return () => clearTimeout(debounce);
  }, [name, jobName]);

  // Show full page skeleton on initial load (no data yet)
  if (loading && candidates.length === 0) {
    return <PageLoadingSkeleton type="candidates" />;
  }

  return (
    <>
      <LoadingAnnouncer 
        isLoading={loading}
        loadingMessage="Loading candidates data and filters"
        completedMessage="Candidates data has been loaded successfully"
      />
      <div className="space-y-6 pr-8">
        {/* Card para filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("FilterCardTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder={t("NamePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="sm:w-1/2"
              />
              <Input
                placeholder={t("JobNamePlaceholder")}
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                className="sm:w-1/2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabla */}
        <CandidatesTable
          candidates={candidates}
          loading={loading}
          error={error}
          pagination={pagination}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </>
  );
}
