"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multiselect";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import {
  Candidate,
  Pagination,
  Filters,
} from "@/app/jobs/[id]/types/CandidateFetchTypes";
import TechnicalResume from "./TechnicalResume";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/redux";
import { openModal } from "@/store/slices/ModalSlice";
import TablePagination from "@/app/jobs/TablePagination";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  filters: Filters;
  onFilterChange: (filters: Record<string, any>) => void;
};

const CandidatesTable: React.FC<Props> = ({
  candidates,
  loading,
  error,
  pagination,
  filters,
  onFilterChange,
}) => {
  const uniqueCategories = Array.from(new Set(filters.categories || []));
  const [date, setDate] = useState<Date | undefined>();
  const t = useTranslations("Candidates");
  const dispatch = useAppDispatch();
  const handleCandidateClick = (candidateId: string) => {
    dispatch(
      openModal({
        type: "DETAILS",
        props: { candidateId },
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {t("TableTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("TableHeadName")}</TableHead>
              <TableHead>{t("TableHeadCurrentJob")}</TableHead>
              <TableHead>
                {t("TableHeadRecruiter")}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <MultiSelect
                      options={
                        filters.recruiters?.map((r) => ({
                          label: r.name,
                          value: r.id,
                        })) || []
                      }
                      selected={[]}
                      setSelected={(values) =>
                        onFilterChange({ recruiters: values })
                      }
                      placeholder={t("FilterRecruiterPlaceholder")}
                    />
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>
                {t("TableHeadCategory")}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <Select
                      onValueChange={(val) =>
                        onFilterChange({
                          category: val === "all" ? undefined : val,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("SelectAllCategories")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("SelectAllCategories")}</SelectItem>
                        {uniqueCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>
                {t("TableHeadLastUpdate")}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        onFilterChange({
                          updated_at: selectedDate
                            ? format(selectedDate, "yyyy-MM-dd")
                            : undefined,
                        });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>{t("TableHeadTechnicalResume")}</TableHead>
              <TableHead>
                {t("TableHeadTags")}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 rounded-full p-1 border hover:bg-muted transition">
                      <Filter size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <MultiSelect
                      options={
                        filters.tags?.map((t) => ({
                          label: t.name,
                          value: t.id,
                        })) || []
                      }
                      selected={[]}
                      setSelected={(values) => onFilterChange({ tags: values })}
                      placeholder={t("FilterTagsPlaceholder")}
                    />
                  </PopoverContent>
                </Popover>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <div className="flex items-center space-x-2">
                        {colIndex === 0 && (
                          <Skeleton variant="circular" className="w-8 h-8" />
                        )}
                        {colIndex === 6 ? (
                          <div className="flex space-x-1">
                            <Skeleton className="h-5 w-12 rounded-full" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                          </div>
                        ) : (
                          <Skeleton 
                            className="h-4 rounded" 
                            style={{ 
                              width: colIndex === 0 ? "100px" : 
                                     colIndex === 1 ? "140px" :
                                     colIndex === 2 ? "90px" :
                                     colIndex === 3 ? "80px" :
                                     colIndex === 4 ? "85px" : "120px"
                            }}
                          />
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>{t("EmptyStateText")}</TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 m-0 text-primary hover:underline cursor-pointer"
                      onClick={() => handleCandidateClick(candidate.id)}
                    >
                      {candidate.name ?? "N/A"}
                    </Button>
                  </TableCell>
                  <TableCell>{candidate.current_job_title ?? "N/A"}</TableCell>
                  <TableCell>{candidate.recruiter_name ?? "N/A"}</TableCell>
                  <TableCell>{candidate.category ?? "N/A"}</TableCell>
                  <TableCell>
                    {candidate.updated_at
                      ? new Date(candidate.updated_at).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <TechnicalResume
                      candidateName={candidate.name ?? "N/A"}
                      technicalResume={candidate.technical_resume ?? null}
                    />
                  </TableCell>
                  <TableCell className="space-x-1">
                    {candidate.tags && candidate.tags.length > 0
                      ? candidate.tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className="bg-blue-100 text-blue-800 border-none"
                          >
                            {tag.name}
                          </Badge>
                        ))
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center">
        <TablePagination
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </CardFooter>
    </Card>
  );
};

export default CandidatesTable;
