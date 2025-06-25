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
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Calendar,
  MessageSquare,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { Candidate } from "../types/candidate";

interface FormsSectionProps {
  candidate: Candidate;
}

const getFieldIcon = (fieldType: string) => {
  switch (fieldType) {
    case "datetime":
      return <Calendar className="h-4 w-4" />;
    case "textarea":
      return <MessageSquare className="h-4 w-4" />;
    case "number":
      return <DollarSign className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const formatFieldValue = (value: any, fieldType: string) => {
  if (!value) return "—";

  switch (fieldType) {
    case "datetime":
      return format(new Date(value), "PPpp", { locale: es });
    case "number":
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(value);
    default:
      return value;
  }
};

export function FormsSection({ candidate }: FormsSectionProps) {
  return (
    <Card
      className="border-0 shadow-sm hover:shadow-md transition-all duration-300"
      data-driver-id="formularios"
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 hover:rotate-12 transition-transform duration-300" />
          Formularios de Evaluación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={candidate.scoreboards[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {candidate.scoreboards.map((sb) => (
              <TabsTrigger
                key={sb.id}
                value={sb.id}
                className="flex items-center gap-2 px-4 py-2 hover:scale-105 transition-all duration-200 data-[state=active]:shadow-md"
              >
                {sb.to_complete ? (
                  <AlertCircle className="h-4 w-4 text-orange-500 animate-pulse" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500 hover:scale-110 transition-transform duration-200" />
                )}
                <span className="truncate">{sb.template_name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {candidate.scoreboards.map((sb) => (
            <TabsContent key={sb.id} value={sb.id} className="mt-0">
              <div className="space-y-6">
                {/* Header del formulario */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {sb.template_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Evaluado por:{" "}
                      <span className="font-medium hover:text-gray-800 transition-colors duration-200">
                        {sb.recruiter_name}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={sb.to_complete ? "destructive" : "default"}
                      className="mb-2 hover:scale-105 transition-transform duration-200"
                    >
                      {sb.to_complete ? "Pendiente" : "Completado"}
                    </Badge>
                    <p className="text-xs text-gray-500">
                      {format(new Date(sb.created_at), "dd/MM/yyyy HH:mm", {
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>

                {/* Campos del formulario */}
                <ScrollArea className="max-h-[500px]">
                  <div className="space-y-4">
                    {sb.entries.map((entry, i) => (
                      <div key={i} className="group">
                        <Card className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                                {getFieldIcon(entry.field_type)}
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                                    {entry.field_name}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className="text-xs hover:bg-gray-100 transition-colors duration-200"
                                  >
                                    {entry.field_type}
                                  </Badge>
                                </div>

                                <div className="min-h-[2rem] flex items-start">
                                  {entry.value ? (
                                    <div className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                      {entry.field_type === "textarea" ? (
                                        <p className="whitespace-pre-wrap leading-relaxed">
                                          {formatFieldValue(
                                            entry.value,
                                            entry.field_type
                                          )}
                                        </p>
                                      ) : (
                                        <span className="font-medium">
                                          {formatFieldValue(
                                            entry.value,
                                            entry.field_type
                                          )}
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-500 transition-colors duration-200">
                                      <AlertCircle className="h-4 w-4 animate-pulse" />
                                      <span className="italic">
                                        Sin completar
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
