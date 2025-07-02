"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Link,
  MessageSquare,
  Pencil,
  RefreshCcw,
  Settings,
  ArrowLeftRight,
} from "lucide-react";
import ActionChat from "./ActionChat";
import ActionUpdate from "./ActionUpdate";
import ActionGenerate from "./ActionGenerate";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import ActionLink from "./ActionLink";
import { fetchJobList } from "@/state/api/fetchJobList";
import ActionCompare from "./ActionCompare";
import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import ActionEdit from "./ActionEdit";

interface CandidateActionsProps {
  onClose: () => void;
  candidate: CandidateDetail;
}

export default function CandidateActions({
  onClose,
  candidate,
}: CandidateActionsProps) {
  const dispatch = useAppDispatch();
  const {
    list: jobList,
    loading: jobListLoading,
    error: jobListError,
  } = useAppSelector((state) => state.jobList);

  useEffect(() => {
    if (!jobList.length && !jobListLoading) {
      fetchJobList(dispatch);
    }
  }, [dispatch, jobList.length, jobListLoading]);

  // 👉 Escuchar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-red-700"
        >
          <X className="w-4 h-4" />
          Rechazar
        </Button>
        <ActionLink
          jobList={jobList}
          loading={jobListLoading}
          error={jobListError}
        />
        <ActionChat />

        <ActionEdit candidate={candidate} />

        <ActionCompare
          jobList={jobList}
          loading={jobListLoading}
          error={jobListError}
        />
       
        <ActionUpdate />
        
        <ActionGenerate />
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={onClose}
        className="cursor-pointer transition-colors hover:bg-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
