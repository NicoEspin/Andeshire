"use client";

import React, { useState, useEffect } from "react";
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
import { Eye, Globe, ChevronDown } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux";
import { fetchJobApplicants } from "@/state/api/Jobs/Id/FetchJobApplicants";
import { updateApplicantStatus } from "@/store/slices/Jobs/id/JobApplicantsSlice";

import { useTranslations } from "next-intl";

const getBadgeColor = (score: number) => {
  if (score < 50) return "bg-red-100 text-red-700";
  if (score < 75) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
};

const ApplicantsView = () => {
  const t = useTranslations("JobId.Applicants");
  const dispatch = useDispatch<AppDispatch>();
  const { applicants, loading, error, loaded } = useSelector(
    (state: RootState) => state.jobApplicants
  );

  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!loaded && !loading) {
      fetchJobApplicants(dispatch, "79f03bb1-ada2-4c99-998e-74c2da154c51");
    }
  }, [dispatch, loaded, loading]);

  const filteredApplicants =
    applicants?.filter((applicant) =>
      applicant.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

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
    dispatch(updateApplicantStatus({ id, status: newStatus }));
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder={t("SearchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/3"
      />

      {loading && <div>{t("Loading")}</div>}
      {error && <div className="text-red-500">{t("Error")}</div>}

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
              <TableHead>{t("Table.Applicant")}</TableHead>
              <TableHead>{t("Table.Scores")}</TableHead>
              <TableHead>{t("Table.Status")}</TableHead>
              <TableHead>{t("Table.Source")}</TableHead>
              <TableHead>{t("Table.Actions")}</TableHead>
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
                          ? t("Status.Submitted")
                          : t("Status.NotSelected")}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(applicant.id, "submitted")
                        }
                      >
                        {t("Status.Submitted")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(applicant.id, "NOT_SELECTED")
                        }
                      >
                        {t("Status.NotSelected")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{t("SourceWeb")}</span>
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
