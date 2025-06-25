"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Folder } from "lucide-react";
import { FileCard } from "./file-card";
import type { Candidate } from "../types/candidate";

interface FilesSectionProps {
  candidate: Candidate;
}

export function FilesSection({ candidate }: FilesSectionProps) {
  return (
    <div className="max-w-4xl mx-auto" data-driver-id="archivos">
      <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Folder className="h-6 w-6 hover:rotate-12 transition-transform duration-300" />
            Archivos del Candidato
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Documentos y archivos subidos por el candidato durante el proceso de
            aplicación.
          </p>
        </CardHeader>
        <CardContent>
          {candidate.files && candidate.files.length > 0 ? (
            <div className="space-y-4">
              {candidate.files.map((file, index) => (
                <div
                  key={file.id}
                  className="hover:-translate-y-1 transition-transform duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <FileCard file={file} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Folder className="h-16 w-16 text-gray-300 mx-auto animate-pulse" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  No hay archivos disponibles
                </h3>
                <p className="text-gray-500 mt-1">
                  El candidato no ha subido archivos adicionales durante el
                  proceso de aplicación.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
