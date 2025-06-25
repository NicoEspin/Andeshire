"use client";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Target, Zap, TrendingUp, AlertTriangle } from "lucide-react";

export function AnalysisSection() {
  return (
    <div className="max-w-4xl mx-auto" data-driver-id="analisis">
      <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold flex items-center gap-3">
            <Target className="h-6 w-6 hover:rotate-12 transition-transform duration-300" />
            Análisis de Compatibilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Resumen del puesto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Puesto aplicado
              </h4>
              <p className="text-xl font-semibold text-gray-900">
                Django Developer
              </p>
            </div>
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Resultado de Heimdall
              </h4>
              <Badge
                variant="destructive"
                className="text-sm font-medium px-3 py-1 hover:scale-105 transition-transform duration-200 animate-pulse"
              >
                NO APLICA FUERTEMENTE
              </Badge>
            </div>
          </div>

          {/* Métricas de puntuación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-50 border-0 hover:bg-red-50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2 group-hover:text-red-700 transition-colors duration-200">
                  <Zap className="h-5 w-5 group-hover:animate-bounce" />
                  Habilidades
                </span>
                <span className="text-3xl font-bold text-red-600 group-hover:scale-110 transition-transform duration-200">
                  0%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-50 border-0 hover:bg-red-50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2 group-hover:text-red-700 transition-colors duration-200">
                  <Target className="h-5 w-5 group-hover:animate-spin" />
                  Match
                </span>
                <span className="text-3xl font-bold text-red-600 group-hover:scale-110 transition-transform duration-200">
                  0%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-50 border-0 hover:bg-red-50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2 group-hover:text-red-700 transition-colors duration-200">
                  <TrendingUp className="h-5 w-5 group-hover:animate-pulse" />
                  Adaptabilidad
                </span>
                <span className="text-3xl font-bold text-red-600 group-hover:scale-110 transition-transform duration-200">
                  0%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Análisis del sistema */}
          <Alert className="border-red-200 bg-red-50 p-6 hover:shadow-lg hover:bg-red-100 transition-all duration-300">
            <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
            <div className="ml-3">
              <h4 className="font-medium text-red-800 mb-2">
                Análisis del Sistema
              </h4>
              <AlertDescription className="text-sm text-red-800 leading-relaxed">
                El candidato tiene experiencia en reclutamiento y gestión de
                personal, pero no cumple con los requisitos específicos del
                puesto de Django Developer. No se menciona experiencia en
                desarrollo de software, Python o Django, lo que indica que no
                tiene la experiencia técnica necesaria para el rol.
              </AlertDescription>
            </div>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
