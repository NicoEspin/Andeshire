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

type AddCandidateCommentProps = {
  type: "regular" | "technical";
};

export default function AddCandidateComment({
  type,
}: AddCandidateCommentProps) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleSave = () => {
    // Aquí colocas la lógica para guardar el comentario vía API
    console.log(`Guardando comentario ${type}:`, comment);
    setOpen(false);
    setComment("");
  };

  const dialogTitle =
    type === "regular"
      ? "Añadir comentario personal"
      : "Añadir comentario técnico";

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
          Añadir comentario {type === "regular" ? "personal" : "técnico"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="text-sm font-medium">Comentario</label>
          <Textarea
            placeholder="Escribe tu comentario aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!comment.trim()} className="bg-purple-700 hover:bg-purple-800">
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
