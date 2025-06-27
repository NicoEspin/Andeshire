"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockApplicants } from "../../data/mockApplicants";
import { Eye, Globe, ChevronDown } from "lucide-react";

type Applicant = (typeof mockApplicants.applicants)[0];

const getBadgeColor = (score: number) => {
  if (score < 50) return "bg-red-100 text-red-700";
  if (score < 75) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
};

const ApplicantsView = () => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [applicants, setApplicants] = useState(mockApplicants.applicants);

  const filteredApplicants = applicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(search.toLowerCase())
  );

  const isAllSelected =
    filteredApplicants.length > 0 &&
    filteredApplicants.every((a) => selectedIds.includes(a.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplicants.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selected) => selected !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar aplicantes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/3"
      />

      <div className="rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Aplicante</TableHead>
              <TableHead>Puntajes</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fuente</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(applicant.id)}
                    onCheckedChange={() => toggleSelectOne(applicant.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{applicant.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {applicant.email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {applicant.phone_number}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getBadgeColor(applicant.average_grade)}>
                      {applicant.average_grade}%
                    </Badge>
                    <Badge className={getBadgeColor(applicant.match_grade)}>
                      M: {applicant.match_grade}
                    </Badge>
                    <Badge className={getBadgeColor(applicant.skills_grade)}>
                      S: {applicant.skills_grade}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 text-xs"
                      >
                        {applicant.status === "submitted"
                          ? "Enviado"
                          : "No Seleccionado"}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(applicant.id, "submitted")
                        }
                      >
                        Enviado
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(applicant.id, "rejected")
                        }
                      >
                        No Seleccionado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>Web</span>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost">
                    <Eye className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsView;
