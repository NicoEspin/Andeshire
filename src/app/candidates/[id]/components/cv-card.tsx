"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { FileText, Eye, Download } from "lucide-react";
import type { CVDocument } from "../types/candidate";

interface CVCardProps {
  cvDocument: CVDocument | null;
}

export function CVCard({ cvDocument }: CVCardProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Curriculum Vitae
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvDocument ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna izquierda - Información del documento y vista previa */}
            <div className="space-y-4">
              {/* Información del documento */}
              <div className="p-3 bg-gray-50 rounded-lg space-y-2 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {cvDocument.filename}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    PDF
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{cvDocument.file_size}</span>
                  <span>
                    {format(new Date(cvDocument.upload_date), "dd/MM/yyyy", {
                      locale: es,
                    })}
                  </span>
                </div>
              </div>

              {/* Acciones del documento */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-200 active:scale-95">
                  <Eye className="h-4 w-4" />
                  Ver completo
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-200 active:scale-95">
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {/* Vista previa del CV */}
              <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center group">
                  <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto animate-pulse" />
                    <p className="text-sm text-gray-500">Vista previa del CV</p>
                    <p className="text-xs text-gray-400">
                      Haz clic en "Ver completo" para abrir
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Resumen de habilidades */}
            <div className="space-y-4">
              <div className="border rounded-lg bg-white p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Resumen
                </h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {[
                    { skill: "Java", years: 13 },
                    { skill: "REST", years: 8 },
                    { skill: "SOAP", years: 4 },
                    { skill: "Spring", years: 3 },
                    { skill: "Microservices", years: 3 },
                    { skill: "Redis", years: 2 },
                    { skill: "Docker", years: 2 },
                    { skill: "Kafka", years: 2 },
                    { skill: "NodeJS", years: 1 },
                    { skill: "Python", years: 1 },
                    { skill: "Groovy", years: 1 },
                    { skill: "Grails", years: 1 },
                    { skill: "PostgreSQL", years: 1 },
                    { skill: "MySQL", years: 1 },
                    { skill: "JDBC", years: 1 },
                    { skill: "JUnit", years: 1 },
                    { skill: "JMockit", years: 1 },
                    { skill: "Swagger", years: 1 },
                    { skill: "Git", years: 1 },
                    { skill: "GitLab", years: 1 },
                    { skill: "Maven", years: 1 },
                    { skill: "Agile", years: 1 },
                  ].map((item, index) => (
                    <div
                      key={item.skill}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors duration-200 group"
                      style={{ transitionDelay: `${index * 20}ms` }}
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {item.skill}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                          {item.years} {item.years === 1 ? "año" : "años"}
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              item.years >= 10
                                ? "bg-green-500"
                                : item.years >= 5
                                ? "bg-blue-500"
                                : item.years >= 3
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                            style={{
                              width: `${Math.min(
                                (item.years / 15) * 100,
                                100
                              )}%`,
                              transitionDelay: `${index * 50}ms`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información adicional extraída del CV */}
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium text-gray-900">
                  Información general
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-500">Experiencia total:</span>
                    <span className="ml-2 text-gray-900">13+ años</span>
                  </div>
                  <div className="hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-500">Educación:</span>
                    <span className="ml-2 text-gray-900">Ing. en Sistemas</span>
                  </div>
                  <div className="hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-500">Ubicación:</span>
                    <span className="ml-2 text-gray-900">Buenos Aires, AR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <FileText className="h-12 w-12 text-gray-300 mx-auto animate-pulse" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                No hay CV disponible
              </p>
              <p className="text-xs text-gray-500">
                El candidato no ha subido su curriculum
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
