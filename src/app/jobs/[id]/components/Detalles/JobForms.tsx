"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Plus } from "lucide-react";

const mockData = {
  job_id: "79f03bb1-ada2-4c99-998e-74c2da154c51",
  job_name: "Lead AI Engineer",
  scoreboards: [
    {
      id: "d7124842-5e9e-498c-9d5f-74994673a346",
      template_name: "Formulario de fecha de entrevista",
      updated_at: "2025-06-27 16:58:30",
      entries: [
        {
          field_name: "Fecha y hora de entrevista",
          value: "2025-06-27 14:00",
        },
      ],
    },
    {
      id: "4758a162-739c-46a0-9e97-3d6e74d64376",
      template_name: "Formulario de fecha de entrevista",
      updated_at: "2025-06-27 12:33:25",
      entries: [
        {
          field_name: "Fecha y hora de entrevista",
          value: "2025-06-27 10:00",
        },
      ],
    },
    {
      id: "660113f3-0c56-42b6-8bfe-8ead00c75c05",
      template_name: "Formulario de fecha de entrevista",
      updated_at: "2025-06-26 20:18:27",
      entries: [
        {
          field_name: "Fecha y hora de entrevista",
          value: "2025-06-26 18:00",
        },
      ],
    },
  ],
};

const JobForms = () => {
  return (
    <Card className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Formularios</h2>
        <Button variant="default" className="bg-black text-white">
          <Plus className="mr-2 h-4 w-4" /> Añadir nuevo
        </Button>
      </div>

      {/* Forms List */}
      <div className="space-y-4">
        {mockData.scoreboards.map((scoreboard) => (
          <Card key={scoreboard.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {scoreboard.template_name}
                </h3>
                <p className="text-sm text-gray-500">
                  Actualizado: {scoreboard.updated_at}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4">
              {scoreboard.entries.map((entry, index) => (
                <div key={index}>
                  <p className="text-sm font-medium">{entry.field_name}</p>
                  <p className="text-sm text-gray-700">{entry.value}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default JobForms;
