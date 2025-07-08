"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddCandidateTags() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("CandidateDetail.Tags");

  const availableTags = [
    t("availableTags.highTurnover"),
    t("availableTags.normalTurnover"),
    t("availableTags.prospect"),
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          {t("addTagButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
        </DialogHeader>
        <Input placeholder={t("searchPlaceholder")} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="flex justify-between"
            >
              <span>{tag}</span>
              <Plus className="w-4 h-4" />
            </Button>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={() => setOpen(false)}
          className="mt-4 w-full"
        >
          {t("cancelButton")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
