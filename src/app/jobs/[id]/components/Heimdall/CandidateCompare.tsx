"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface CandidateCompareProps {
  candidateId: string;      // 👈 ID único del candidato
  candidateName: string;
  keyPoints: string;        // HTML seguro
}

const CandidateCompare: React.FC<CandidateCompareProps> = ({
  candidateId,
  candidateName,
  keyPoints,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {candidateName} (ID: {candidateId})
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Puntos clave del candidato.
          </DialogDescription>
        </DialogHeader>

        <div
          className="prose prose-sm max-h-[400px] overflow-y-auto text-lg"
          dangerouslySetInnerHTML={{ __html: keyPoints }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CandidateCompare;
