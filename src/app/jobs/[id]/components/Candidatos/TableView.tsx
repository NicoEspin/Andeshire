"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Stage } from "../../types/StagesTypes";
import {
  CandidatesByStage,
  CandidateDetail,
} from "../../types/CandidatesByStagesTypes";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface TableViewProps {
  stages: Stage[];
  candidatesByStage: CandidatesByStage;
}
import { useAppDispatch } from "@/app/redux";
import { openModal } from "@/store/slices/ModalSlice";

const TableView = ({ stages, candidatesByStage }: TableViewProps) => {
  const dispatch = useAppDispatch();
  const allCandidatesMap = new Map<string, CandidateDetail>();
  Object.values(candidatesByStage)
    .flat()
    .forEach((candidate) => {
      allCandidatesMap.set(candidate.id, candidate);
    });
  const allCandidates = Array.from(allCandidatesMap.values());

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedIds.size === allCandidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allCandidates.map((c) => c.id)));
    }
  };
  const handleCandidateClick = (candidateId: string) => {
    dispatch(
      openModal({
        type: "DETAILS",
        props: { candidateId },
      })
    );
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={selectedIds.size === allCandidates.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Fecha de aplicación</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Compensación</TableHead>
            <TableHead>Estado en otros procesos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCandidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="w-10">
                <Checkbox
                  checked={selectedIds.has(candidate.id)}
                  onCheckedChange={() => toggleSelect(candidate.id)}
                />
              </TableCell>
              <TableCell
                className="font-medium"
                onClick={() => handleCandidateClick(candidate.id)}
              >
                <Button
                  variant="link"
                  className="p-0 m-0 text-primary hover:underline cursor-pointer"
                  onClick={() => handleCandidateClick(candidate.id)}
                >
                  {candidate.name}
                </Button>
              </TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-left w-full justify-between"
                    >
                      {candidate.current_stage?.name || "Sin etapa"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {stages.map((stage) => (
                      <DropdownMenuItem key={stage.id}>
                        {stage.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                {new Date(candidate.created_at).toLocaleDateString("es-AR")}
              </TableCell>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
              <TableCell>—</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
