"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type TechnicalResumeProps = {
  candidateName: string;
  technicalResume: string | null;
};

export default function TechnicalResume({
  candidateName,
  technicalResume,
}: TechnicalResumeProps) {
  // Función para limpiar el string y parsear a JSON
  const parseTechnicalResume = (): Record<
    string,
    { years: number; months: number }
  > | null => {
    if (!technicalResume) return null;

    try {
      // Quitar backticks, etiquetas u otros caracteres no JSON
      const cleanString = technicalResume
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/\\u003Cbr\\u003E/g, "")
        .replace(/<br>/g, "")
        .trim();
      return JSON.parse(cleanString);
    } catch (error) {
      console.error("Error parsing technical resume:", error);
      return null;
    }
  };
  

  const parsedResume = parseTechnicalResume();
  if (!technicalResume) {
    return <div>N/A</div>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="cursor-pointer">
          <Eye className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Resumen Técnico - {candidateName || "N/A"}</DialogTitle>
          <DialogDescription>
            Experiencia detallada por tecnología
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 max-h-[400px] overflow-y-auto text-sm">
          {parsedResume ? (
            Object.entries(parsedResume).map(([tech, exp]) => (
              <div
                key={tech}
                className="flex justify-between border-b border-muted py-1"
              >
                <span className="font-medium">{tech}</span>
                <span className="text-muted-foreground">
                  {exp.years} años {exp.months > 0 && `${exp.months} meses`}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">
              No hay resumen técnico disponible.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
