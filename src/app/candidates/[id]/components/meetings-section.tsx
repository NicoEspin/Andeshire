"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Calendar, Plus } from "lucide-react";

export function MeetingsSection() {
  const handleAddMeeting = () => {
    console.log("Agregar reunión");
    // Aquí iría la lógica para abrir un modal o formulario
  };

  return (
    <div className="max-w-4xl mx-auto" data-driver-id="reuniones">
      <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold flex items-center gap-3">
              <Calendar className="h-6 w-6 hover:rotate-12 transition-transform duration-300" />
              Meetings
            </CardTitle>
            <Button
              onClick={handleAddMeeting}
              className="flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Agregar Reunión
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto animate-pulse" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                No hay reuniones programadas
              </h3>
              <p className="text-gray-500 mt-1">
                Haz clic en "Agregar Reunión" para programar una nueva reunión
                con este candidato.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
