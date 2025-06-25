"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Separator } from "@/app/components/ui/separator";
import {
  Target,
  AlertTriangle,
  User,
  Briefcase,
  GraduationCap,
  Clock,
} from "lucide-react";
import type { Candidate } from "../types/candidate";

interface HeimdallSectionProps {
  candidate: Candidate;
}

export function HeimdallSection({ candidate }: HeimdallSectionProps) {
  return (
    <div className="max-w-4xl mx-auto" data-driver-id="heimdall">
      <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Target className="h-6 w-6 hover:rotate-12 transition-transform duration-300" />
            Análisis Heimdall
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Análisis detallado de compatibilidad del candidato con el puesto
            solicitado
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Estado general */}
          <div className="flex items-center justify-between p-6 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-200">
                <AlertTriangle className="h-6 w-6 text-red-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">
                  Candidato No Apto
                </h3>
                <p className="text-red-700">
                  El perfil no cumple con los requisitos del puesto
                </p>
              </div>
            </div>
            <Badge
              variant="destructive"
              className="text-sm font-medium px-4 py-2 hover:scale-105 transition-transform duration-200"
            >
              NO RECOMENDADO
            </Badge>
          </div>

          {/* Resumen del análisis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Candidato
              </h4>
              <p className="text-xl font-semibold text-gray-900">
                {candidate.candidate_name}
              </p>
              <p className="text-gray-600 mt-1">
                Aplicando para: {candidate.position}
              </p>
            </div>
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Puntuación General
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-red-600 hover:scale-110 transition-transform duration-200">
                  15/100
                </span>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Análisis detallado */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Análisis Detallado
            </h3>

            {/* Experiencia */}
            <Card className="border border-red-200 bg-red-50/30 hover:bg-red-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200">
                    <Briefcase className="h-5 w-5 text-red-600 hover:animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Experiencia Profesional
                    </h4>
                    <p className="text-gray-700 mb-3">
                      <strong>Incompatibilidad crítica:</strong> El candidato
                      tiene experiencia en reclutamiento y gestión de recursos
                      humanos, pero el puesto requiere experiencia específica en
                      desarrollo de software con Django y Python.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between hover:bg-red-50 p-2 rounded transition-colors duration-200">
                        <span className="text-gray-600">
                          Experiencia en desarrollo:
                        </span>
                        <Badge
                          variant="destructive"
                          className="text-xs hover:scale-105 transition-transform duration-200"
                        >
                          No encontrada
                        </Badge>
                      </div>
                      <div className="flex justify-between hover:bg-red-50 p-2 rounded transition-colors duration-200">
                        <span className="text-gray-600">
                          Conocimiento de Python/Django:
                        </span>
                        <Badge
                          variant="destructive"
                          className="text-xs hover:scale-105 transition-transform duration-200"
                        >
                          No mencionado
                        </Badge>
                      </div>
                      <div className="flex justify-between hover:bg-red-50 p-2 rounded transition-colors duration-200">
                        <span className="text-gray-600">
                          Experiencia en tecnologías web:
                        </span>
                        <Badge
                          variant="destructive"
                          className="text-xs hover:scale-105 transition-transform duration-200"
                        >
                          No evidenciada
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Habilidades técnicas */}
            <Card className="border border-red-200 bg-red-50/30 hover:bg-red-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200">
                    <GraduationCap className="h-5 w-5 text-red-600 hover:animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Habilidades Técnicas
                    </h4>
                    <p className="text-gray-700 mb-3">
                      El perfil del candidato no demuestra las competencias
                      técnicas necesarias para el desarrollo web con Django.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="hover:bg-red-50 p-3 rounded transition-colors duration-200">
                        <span className="text-gray-600 block mb-1">
                          Requerido:
                        </span>
                        <ul className="space-y-1 text-gray-500">
                          <li>• Python avanzado</li>
                          <li>• Django Framework</li>
                          <li>• Bases de datos</li>
                          <li>• APIs REST</li>
                        </ul>
                      </div>
                      <div className="hover:bg-red-50 p-3 rounded transition-colors duration-200">
                        <span className="text-gray-600 block mb-1">
                          Encontrado:
                        </span>
                        <ul className="space-y-1 text-red-600">
                          <li>• Gestión de personal</li>
                          <li>• Reclutamiento</li>
                          <li>• Administración</li>
                          <li>• Comunicación</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recomendaciones */}
            <Alert className="border-blue-200 bg-blue-50 p-6 hover:bg-blue-100 hover:shadow-md transition-all duration-300">
              <User className="h-5 w-5 text-blue-600 hover:animate-bounce" />
              <div className="ml-3">
                <h4 className="font-medium text-blue-800 mb-2">
                  Recomendaciones del Sistema
                </h4>
                <AlertDescription className="text-sm text-blue-800 space-y-2">
                  <p>
                    <strong>Para el reclutador:</strong> Este candidato no es
                    adecuado para el puesto de Django Developer. Se recomienda
                    buscar candidatos con experiencia comprobada en desarrollo
                    web y Python.
                  </p>
                  <p>
                    <strong>Perfil alternativo:</strong> El candidato podría ser
                    considerado para posiciones en Recursos Humanos,
                    Reclutamiento IT o roles administrativos dentro del área de
                    tecnología.
                  </p>
                </AlertDescription>
              </div>
            </Alert>
          </div>

          {/* Métricas de compatibilidad */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center border border-red-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-2xl font-bold text-red-600 mb-1 group-hover:scale-110 transition-transform duration-200">
                0%
              </div>
              <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                Habilidades Técnicas
              </div>
            </Card>
            <Card className="p-4 text-center border border-red-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-2xl font-bold text-red-600 mb-1 group-hover:scale-110 transition-transform duration-200">
                5%
              </div>
              <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                Experiencia Relevante
              </div>
            </Card>
            <Card className="p-4 text-center border border-yellow-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-2xl font-bold text-yellow-600 mb-1 group-hover:scale-110 transition-transform duration-200">
                75%
              </div>
              <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                Soft Skills
              </div>
            </Card>
            <Card className="p-4 text-center border border-red-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-2xl font-bold text-red-600 mb-1 group-hover:scale-110 transition-transform duration-200">
                15%
              </div>
              <div className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                Match General
              </div>
            </Card>
          </div>

          {/* Timestamp del análisis */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-4 border-t hover:text-gray-700 transition-colors duration-200">
            <Clock className="h-4 w-4 animate-pulse" />
            <span>Análisis generado el 19 de enero de 2025 a las 14:30</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
