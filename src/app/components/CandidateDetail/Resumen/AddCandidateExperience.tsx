"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function AddCandidateExperience() {
  const t = useTranslations("CandidateDetail.Summary.experience.Add");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t("button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{t("title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">{t("company")}</label>
            <Input placeholder={t("companyPlaceholder")} />
          </div>
          <div>
            <label className="block text-sm font-medium">{t("role")}</label>
            <Input placeholder={t("rolePlaceholder")} />
          </div>
          <div>
            <label className="block text-sm font-medium">
              {t("startDate")}
            </label>
            <Input type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium">{t("endDate")}</label>
            <Input type="date" />
            <p className="text-xs text-gray-500">{t("currentJobHint")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">
              {t("description")}
            </label>
            <Textarea placeholder={t("descriptionPlaceholder")} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">{t("cancel")}</Button>
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              {t("save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
