"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchJobList } from "@/state/api/Jobs/fetchJobList";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import TableJobList from "./TableJobList";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { setJobListFiltersApplied } from "@/store/slices/Jobs/JobListSlice";
import { useTranslations } from "next-intl";
import { PageLoadingSkeleton } from "@/components/ui/skeleton-variants";
import { LoadingAnnouncer } from "@/components/ui/loading-announcer";

export default function JobList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Jobs");
  const {
    list: jobList,
    loading: jobListLoading,
    error: jobListError,
    filters: jobListFilters,
    filters_applied: jobListFiltersApplied,
    currentPage: jobListCurrentPage,
    totalPages: jobListTotalPages,
  } = useAppSelector((state) => state.jobList);

  const [title, setTitle] = useState("");

  /** 🔍 Parse filters from URL */
  const parseFiltersFromURL = (params: Record<string, string>) => {
    const parsed: Record<string, any> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "undefined") parsed[key] = value;
    });
    return parsed;
  };

  /** 🔍 Build query string */
  const buildQueryParams = (filters: Record<string, any>) => {
    const cleaned: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) cleaned[key] = String(value);
    });
    return new URLSearchParams(cleaned).toString();
  };

  /** 🚀 Initial fetch when URL changes */
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const parsed = parseFiltersFromURL(params);
    setTitle(parsed.title || "");
    dispatch(setJobListFiltersApplied(parsed));
    fetchJobList(dispatch, parsed);
  }, [dispatch, searchParams.toString()]);

  /** 🚀 Handle filters & pagination */
  const handleFilterChange = (
    updated: Record<string, any>,
    isPageChange = false
  ) => {
    const current = parseFiltersFromURL(
      Object.fromEntries(searchParams.entries())
    );
    const merged = { ...current, ...updated };

    // Si NO es un cambio de página, resetea a la página 1
    if (!isPageChange) {
      merged.page = 1;
    }

    const query = buildQueryParams(merged);
    router.push(`?${query}`);
    dispatch(setJobListFiltersApplied(merged));
    fetchJobList(dispatch, merged);
  };

  /** ⏱️ Debounce para buscar por título */
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleFilterChange({ title });
    }, 500);

    return () => clearTimeout(debounce);
  }, [title]);

  // Show full page skeleton on initial load (no data yet)
  if (jobListLoading && jobList.length === 0) {
    return <PageLoadingSkeleton type="jobs" />;
  }

  return (
    <>
      <LoadingAnnouncer 
        isLoading={jobListLoading}
        loadingMessage="Loading jobs data and filters"
        completedMessage="Jobs data has been loaded successfully"
      />
      <div className="space-y-6 pr-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("filterTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder={t("searchPlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full sm:w-1/2"
            />
          </CardContent>
        </Card>

        <TableJobList
          jobList={jobList}
          loading={jobListLoading}
          error={jobListError}
          filters={jobListFilters}
          filtersApplied={jobListFiltersApplied}
          currentPage={(jobListCurrentPage || 1)}
          totalPages={jobListTotalPages}
          onFilterChange={(filters) => handleFilterChange(filters)}
          onPageChange={(page) => handleFilterChange({ page }, true)}
        />
      </div>
    </>
  );
}
