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
import { useAppDispatch } from "@/app/redux";
import { openModal } from "@/store/slices/ModalSlice";
import { useTranslations } from "next-intl";

interface TableViewProps {
  stages: Stage[];
  candidatesByStage: CandidatesByStage;
  visibleColumns: Record<string, boolean>;
}

const TableView = ({
  stages,
  candidatesByStage,
  visibleColumns,
}: TableViewProps) => {
  const t = useTranslations("JobId.Candidates.TableView");
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

            {visibleColumns["Nombre"] && (
              <TableHead>{t("Columns.Name")}</TableHead>
            )}
            {visibleColumns["Email"] && (
              <TableHead>{t("Columns.Email")}</TableHead>
            )}
            {visibleColumns["Etapa"] && (
              <TableHead>{t("Columns.Stage")}</TableHead>
            )}
            {visibleColumns["Fecha de aplicación"] && (
              <TableHead>{t("Columns.ApplicationDate")}</TableHead>
            )}
            {visibleColumns["Match"] && (
              <TableHead>{t("Columns.Match")}</TableHead>
            )}
            {visibleColumns["Compensación"] && (
              <TableHead>{t("Columns.Compensation")}</TableHead>
            )}
            {visibleColumns["Estado en otros procesos"] && (
              <TableHead>{t("Columns.OtherProcesses")}</TableHead>
            )}
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

              {visibleColumns["Nombre"] && (
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
              )}

              {visibleColumns["Email"] && (
                <TableCell>{candidate.email}</TableCell>
              )}

              {visibleColumns["Etapa"] && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-left w-full justify-between"
                      >
                        {candidate.current_stage?.name || t("Columns.NoStage")}
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
              )}

              {visibleColumns["Fecha de aplicación"] && (
                <TableCell>
                  {new Date(candidate.created_at).toLocaleDateString("es-AR")}
                </TableCell>
              )}

              {visibleColumns["Match"] && <TableCell>—</TableCell>}
              {visibleColumns["Compensación"] && <TableCell>—</TableCell>}
              {visibleColumns["Estado en otros procesos"] && (
                <TableCell>—</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
