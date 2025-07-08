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
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type AddCandidateCommentProps = {
  type: "regular" | "technical";
};

export default function AddCandidateComment({
  type,
}: AddCandidateCommentProps) {
  const t = useTranslations("CandidateDetail.Comments.Add");
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleSave = () => {
    // Aquí colocas la lógica para guardar el comentario vía API
    console.log(`Guardando comentario ${type}:`, comment);
    setOpen(false);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={type === "regular" ? "outline" : "default"}
          size="sm"
          className={
            type === "regular"
              ? "border-purple-700 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
              : "bg-purple-700 text-white hover:bg-purple-800"
          }
        >
          {type === "regular" ? t("Button.Regular") : t("Button.Technical")}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "regular"
              ? t("DialogTitle.Regular")
              : t("DialogTitle.Technical")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="text-sm font-medium">{t("Label")}</label>
          <Textarea
            placeholder={t("Placeholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!comment.trim()}
              className="bg-purple-700 hover:bg-purple-800"
            >
              {t("Save")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
