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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddCandidateMeet() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("CandidateDetail.Meetings.Add");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Botón para abrir */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border text-white bg-purple-700 hover:bg-purple-800 hover:text-white"
        >
          <Plus className="w-4 h-4" />
          {t("Button")}
        </Button>
      </DialogTrigger>

      {/* Contenido del modal */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("Title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Título */}
          <div>
            <Label htmlFor="summary">{t("SummaryLabel")}</Label>
            <Input id="summary" placeholder={t("SummaryPlaceholder")} />
          </div>

          {/* Fechas */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="start">{t("StartLabel")}</Label>
              <Input type="datetime-local" id="start" />
            </div>
            <div className="flex-1">
              <Label htmlFor="end">{t("EndLabel")}</Label>
              <Input type="datetime-local" id="end" />
            </div>
          </div>

          {/* Participantes */}
          <div>
            <Label htmlFor="participants">{t("ParticipantsLabel")}</Label>
            <Input
              id="participants"
              placeholder={t("ParticipantsPlaceholder")}
            />
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description">{t("DescriptionLabel")}</Label>
            <Textarea
              id="description"
              placeholder={t("DescriptionPlaceholder")}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {t("Cancel")}
          </Button>
          <Button className="bg-purple-700 text-white hover:bg-purple-800">
            {t("Submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
