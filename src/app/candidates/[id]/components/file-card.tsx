"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { FileText, Calendar, Eye, Download } from "lucide-react";
import type { CandidateFile } from "../types/candidate";

interface FileCardProps {
  file: CandidateFile;
}

export function FileCard({ file }: FileCardProps) {
  const handleView = () => {
    window.open(file.url, "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.filename;
    link.click();
  };

  return (
    <Card className="border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
              <FileText className="h-6 w-6 text-blue-600 group-hover:animate-bounce" />
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-200">
                  {file.filename}
                </h3>
                {file.description && (
                  <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-700 transition-colors duration-200">
                    {file.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1 group-hover:text-gray-700 transition-colors duration-200">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Subido el{" "}
                    {format(
                      new Date(file.uploaded_at),
                      "dd/MM/yyyy 'a las' HH:mm",
                      { locale: es }
                    )}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
                >
                  PDF
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleView}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <Eye className="h-4 w-4" />
              Ver
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-green-50 hover:text-green-700 hover:border-green-300 hover:shadow-md hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Descargar
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
