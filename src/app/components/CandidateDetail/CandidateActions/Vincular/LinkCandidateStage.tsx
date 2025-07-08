"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fetchJobStages } from "@/state/api/Jobs/Id/FetchJobStagesSlice";
import { useTranslations } from "next-intl";

export default function LinkCandidateStage() {
  const dispatch = useAppDispatch();
  const { stages, loading } = useAppSelector((state) => state.jobStages);
  const t = useTranslations("CandidateDetail.CandidateActions.ActionLink.Link");

  const [open, setOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>("");

  useEffect(() => {
    if (open && !stages.length) {
      fetchJobStages(dispatch);
    }
  }, [open, stages.length, dispatch]);

  const handleConfirm = () => {
    console.log("Stage seleccionado:", selectedStage);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        >
          {t("Button")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("Label")}</label>
            <Select
              value={selectedStage}
              onValueChange={setSelectedStage}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("Placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.name}>
                    {stage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("Back")}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedStage}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {t("Confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
