"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Folder, Plus } from "lucide-react";
import { Job } from "../../types/JobTypes";

type Props = {
  job: Job;
};

const FilesJobs = ({ job }: Props) => {
  const files = job.files;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Archivos del Puesto</CardTitle>
        <Button
          size="sm"
          variant="default"
          className="flex items-center gap-2 rounded-md shadow-md"
        >
          <Plus className="w-4 h-4" />
          Añadir Archivo
        </Button>
      </CardHeader>
      <CardContent>
        {files && files.length > 0 ? (
          <ul className="space-y-4">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-md p-3 hover:bg-muted transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium">{file.filename}</p>
                    {file.description && (
                      <p className="text-xs text-muted-foreground">
                        {file.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Subido: {new Date(file.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 md:mt-0 text-sm text-blue-600 hover:underline"
                >
                  Descargar
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-2 py-10">
            <Folder className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground font-medium">
              No hay archivos disponibles
            </p>
            <Badge variant="secondary">Sin adjuntos</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilesJobs;
