"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Users, LinkIcon, Info, Plus } from "lucide-react";
import { format, parseISO } from "date-fns";
import AddCandidateMeet from "./AddCandidateMeet";

type Meeting = {
  id: string;
  summary: string;
  description: string;
  start_time: string;
  end_time: string;
  link: string;
  participants: { email: string }[];
  created_at: string;
};

const CandidateMeetings = () => {
  // Mock data simulando la respuesta EXACTA de la API
  const mockApiResponse = {
    status: "success",
    candidate_id: "d73f4366-5615-47d1-851d-cea31c11ba17",
    meetings: [
      {
        id: "00f886e1-cb85-48a6-aae2-623eac2fdcd3",
        summary: "Entrevista con RH Visión para posición abierta",
        description:
          "Reunión por Google Meet con RH Visión (Carlia) para conocerte y discutir la posición abierta. Enlaces de interés: candidate link: andeshire.com/ats/candidate/d73f4366-5615-47d1-851d-cea31c11ba17; job link: andeshire.com/ats/jobs/f96c5cba-1f97-4c66-b486-9e34e0a3a385.",
        start_time: "2025-06-05T20:00:00+00:00",
        end_time: "2025-06-05T20:30:00+00:00",
        link: "https://meet.google.com/hit-aubx-jfa",
        participants: [
          { email: "napoli.201635@gmail.com" },
          { email: "mramirez584@mi.unc.edu.ar" },
        ],
        created_at: "2025-06-02T03:29:09.416161+00:00",
      },
      {
        id: "cd0e3938-f757-4aff-b395-13069b6a449e",
        summary:
          "Reunión de presentación para la posición de Senior Project Manager",
        description:
          "Charla inicial para conocerte y evaluar tu interés en la posición de Senior Project Manager. 1. Candidate link: andeshire.com/ats/candidate/d73f4366-5615-47d1-851d-cea31c11ba17 2. Job link: andeshire.com/ats/jobs/f96c5cba-1f97-4c66-b486-9e34e0a3a385",
        start_time: "2025-06-05T19:00:00+00:00",
        end_time: "2025-06-05T19:30:00+00:00",
        link: "https://meet.google.com/cdc-gkxd-eck",
        participants: [
          { email: "napoli.201635@gmail.com" },
          { email: "mramirez584@mi.unc.edu.ar" },
        ],
        created_at: "2025-06-02T03:02:03.265756+00:00",
      },
      // Puedes añadir más reuniones o dejarlo vacío para probar el caso vacío
    ],
  };

  const meetings: Meeting[] = mockApiResponse.meetings;
  const hasMeetings = meetings && meetings.length > 0;

  return (
    <div className="space-y-6">
      {/* Encabezado con título y botón */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Reuniones</h2>
        <AddCandidateMeet />
      </div>

      {/* Lista de reuniones o mensaje vacío */}
      <div className="grid gap-4">
        {hasMeetings ? (
          meetings.map((meeting) => (
            <Card
              key={meeting.id}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-purple-700 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5" />
                  {meeting.summary}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {format(parseISO(meeting.start_time), "PPpp")} -{" "}
                  {format(parseISO(meeting.end_time), "pp")}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 whitespace-pre-line">
                  {meeting.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={meeting.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Enlace a la reunión
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-purple-700" />
                  {meeting.participants.map((p) => p.email).join(", ")}
                </div>
                <p className="text-xs text-gray-400">
                  Creado: {format(parseISO(meeting.created_at), "PPpp")}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <Info className="w-10 h-10 text-purple-700 mb-4" />
            <p className="text-gray-600">
              No hay reuniones agendadas para este candidato.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CandidateMeetings;
