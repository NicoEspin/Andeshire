"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchJobList } from "@/state/api/Jobs/fetchJobList";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import TableJobList from "./TableJobList";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { setJobListFiltersApplied } from "@/store/slices/Jobs/JobListSlice";

export default function JobList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

 const {
  list: jobList,
  loading: jobListLoading,
  error: jobListError,
  filters: jobListFilters,         
  filters_applied: jobListFiltersApplied,  
} = useAppSelector((state) => state.jobList);

  const [title, setTitle] = useState("");

  /** 🔍 Parsear filtros desde URL */
  const parseFiltersFromURL = (params: Record<string, string>) => {
    const parsed: Record<string, any> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "undefined") parsed[key] = value;
    });
    return parsed;
  };

  /** 🔍 Construir query string limpio */
  const buildQueryParams = (filters: Record<string, any>) => {
    const cleaned: Record<string, any> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) cleaned[key] = value;
    });
    return new URLSearchParams(cleaned).toString();
  };

  /** 🚀 Fetch inicial cuando cambia URL */
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const parsed = parseFiltersFromURL(params);
    setTitle(parsed.title || "");
    dispatch(setJobListFiltersApplied(parsed));
    fetchJobList(dispatch, parsed);
  }, [dispatch, searchParams.toString()]);

  /** 🚀 Handler para cambio de filtros */
  const handleFilterChange = (updated: Record<string, any>) => {
    const current = parseFiltersFromURL(
      Object.fromEntries(searchParams.entries())
    );
    const merged = { ...current, ...updated };
    const query = buildQueryParams(merged);
    router.push(`?${query}`);
    dispatch(setJobListFiltersApplied(merged));
    fetchJobList(dispatch, merged);
  };

  /** ⏱️ Debounce al escribir título */
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleFilterChange({ title });
    }, 500);

    return () => clearTimeout(debounce);
  }, [title]);

  return (
    <div className="space-y-6 pr-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtrar trabajos</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="🔍 Buscar por nombre del trabajo"
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
        onFilterChange={(filters) => {
          dispatch(setJobListFiltersApplied(filters));
          // ⚡ Y probablemente vuelves a llamar tu fetchJobList
        }}
      />
    </div>
  );
}
