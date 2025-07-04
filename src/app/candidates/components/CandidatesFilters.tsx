"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multiselect";

type Company = string;
type Recruiter = { id: string; name: string };
type Tag = { id: string; name: string };

interface CandidateFiltersProps {
  categories: string[];
  companies: Company[];
  recruiters: Recruiter[];
  tags: Tag[];
  onFilterChange: (filters: Record<string, any>) => void;
}

export default function CandidateFilters({
  categories,
  companies,
  recruiters,
  tags,
  onFilterChange,
}: CandidateFiltersProps) {
  const [name, setName] = React.useState("");
  const [jobName, setJobName] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([
    "all",
  ]);
  const [selectedRecruiters, setSelectedRecruiters] = React.useState<string[]>([
    "all",
  ]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["all"]);
  const [updatedAt, setUpdatedAt] = React.useState<Date | null>(null);

  const handleApplyFilters = () => {
    const cleanFilters = {
      name: name || undefined,
      job_name: jobName || undefined,
      category: category !== "all" ? category : undefined,
      companies: selectedCompanies.includes("all")
        ? undefined
        : selectedCompanies,
      recruiters: selectedRecruiters.includes("all")
        ? undefined
        : selectedRecruiters,
      tags: selectedTags.includes("all") ? undefined : selectedTags,
      updated_at: updatedAt ? updatedAt.toISOString().split("T")[0] : undefined,
    };

    onFilterChange(cleanFilters);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 p-4 border rounded-md">
      {/* Name */}
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          placeholder="Buscar por nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Job Name */}
      <div>
        <Label htmlFor="jobName">Job Name</Label>
        <Input
          id="jobName"
          placeholder="Buscar por job name"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {Array.from(new Set(categories)).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Companies */}
      <div>
        <Label>Empresas</Label>
        <MultiSelect
          options={[
            { label: "Todas", value: "all" },
            ...companies.map((c) => ({
              label: c || "Sin nombre",
              value: c || "Sin nombre",
            })),
          ]}
          selected={selectedCompanies}
          setSelected={setSelectedCompanies}
          placeholder="Todas las empresas"
        />
      </div>

      {/* Recruiters */}
      <div>
        <Label>Reclutadores</Label>
        <MultiSelect
          options={[
            { label: "Todos", value: "all" },
            ...recruiters.map((r) => ({ label: r.name, value: r.id })),
          ]}
          selected={selectedRecruiters}
          setSelected={setSelectedRecruiters}
          placeholder="Todos los reclutadores"
        />
      </div>

      {/* Tags */}
      <div>
        <Label>Tags</Label>
        <MultiSelect
          options={[
            { label: "Todos", value: "all" },
            ...tags.map((t) => ({ label: t.name, value: t.id })),
          ]}
          selected={selectedTags}
          setSelected={setSelectedTags}
          placeholder="Todos los tags"
        />
      </div>

      {/* Updated At */}
      <div>
        <Label>Fecha de actualización</Label>
        <Input
          type="date"
          value={updatedAt ? updatedAt.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setUpdatedAt(e.target.value ? new Date(e.target.value) : null)
          }
        />
      </div>

      {/* Apply Button */}
      <div className="flex items-end">
        <Button onClick={handleApplyFilters} className="w-full">
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
}
