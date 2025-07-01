"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Share2, Pencil, Trash2 } from "lucide-react";
import AddCandidateForm from "./AddCandidateForm";

type Props = {};

const CandidateScoreboard = (props: Props) => {
  // ⚡ API Response exacta tal cual está
  const data = {
    "candidate_id": "29dc8ea0-cf05-424a-84b5-c1b30c9925f1",
    "candidate_name": "Julián Bracamonte",
    "scoreboards": [
        {
            "id": "5809a7f6-bcb1-4e66-bfa1-78c113d0dd89",
            "template_id": "5d06a9b8-ae9e-4690-b7d7-affb1e617c92",
            "template_name": "Formulario de fecha de entrevista",
            "recruiter_name": "Julian",
            "public": false,
            "public_url": null,
            "public_shares": [],
            "to_complete": false,
            "created_at": "2025-05-26 20:56:51",
            "updated_at": "2025-05-26 20:56:51",
            "entries": [
                {
                    "id": "33b97c96-ad10-40a7-a442-db342662bea3",
                    "field_id": "97a228f7-efbd-4f31-8696-587895146c4d",
                    "field_name": "Fecha y hora de entrevista",
                    "field_type": "datetime",
                    "description": "Seleccione la fecha y hora de la entrevista",
                    "value": "2025-05-27 22:08",
                    "updated_at": "2025-05-26 20:56:51"
                },
                {
                    "id": "0e9067d3-a7b9-4a7e-ae14-dc38cb39fe55",
                    "field_id": "d5da9345-5cf5-4771-a072-5a4736473d30",
                    "field_name": "Notas adicionales",
                    "field_type": "textarea",
                    "description": "Notas adicionales sobre la entrevista",
                    "value": "prueba 2",
                    "updated_at": "2025-05-26 20:56:51"
                }
            ],
            "responses": []
        },
        {
            "id": "df77e826-45c4-4518-8d5a-32a2b5392795",
            "template_id": "4325747c-71a7-4da4-a05a-ee5adce3f8c9",
            "template_name": "Screening MODELO BELEN",
            "recruiter_name": "Julian",
            "public": false,
            "public_url": null,
            "public_shares": [],
            "to_complete": true,
            "created_at": "2025-05-26 20:55:43",
            "updated_at": "2025-05-26 20:55:43",
            "entries": [
                {
                    "id": "3a671d0e-8bc5-4252-96c5-8ac383edcaca",
                    "field_id": "61fd238a-8ddc-4723-83fc-ca1f9111feab",
                    "field_name": "Screening",
                    "field_type": "textarea",
                    "description": "Aca se escribe el screning del candidato",
                    "value": null,
                    "updated_at": "2025-05-26 20:55:43"
                },
                {
                    "id": "872067dc-35d2-4593-85c0-ed2d34410a1a",
                    "field_id": "effc7c85-05f3-4880-be80-5b9dc03e8aed",
                    "field_name": "Remuneración actual",
                    "field_type": "number",
                    "description": "Aca se aclara la remuneración actual y se aclara pesos o dolar ",
                    "value": null,
                    "updated_at": "2025-05-26 20:55:44"
                },
                {
                    "id": "c5771e56-cc33-4298-b667-af2a5842a06f",
                    "field_id": "3c67ed06-bc5d-4b20-ada9-0384b393a3c2",
                    "field_name": "Remuneración Pretendida ",
                    "field_type": "number",
                    "description": "Aca se aclara la RP y se aclara pesos o dolar ",
                    "value": null,
                    "updated_at": "2025-05-26 20:55:44"
                }
            ],
            "responses": []
        },
        {
            "id": "4f941d03-5187-4e0e-b035-e14aa3e2d8c7",
            "template_id": "5d06a9b8-ae9e-4690-b7d7-affb1e617c92",
            "template_name": "Formulario de fecha de entrevista",
            "recruiter_name": "Belén",
            "public": false,
            "public_url": null,
            "public_shares": [],
            "to_complete": false,
            "created_at": "2025-05-26 20:28:54",
            "updated_at": "2025-05-26 20:28:54",
            "entries": [
                {
                    "id": "cb276f53-3b46-42c7-b6b4-ab7cef2f6fab",
                    "field_id": "97a228f7-efbd-4f31-8696-587895146c4d",
                    "field_name": "Fecha y hora de entrevista",
                    "field_type": "datetime",
                    "description": "Seleccione la fecha y hora de la entrevista",
                    "value": "2025-05-27 09:30",
                    "updated_at": "2025-05-26 20:28:54"
                }
            ],
            "responses": []
        },
        {
            "id": "231acfc3-191f-4d41-8841-a74c21523036",
            "template_id": "4325747c-71a7-4da4-a05a-ee5adce3f8c9",
            "template_name": "Screening MODELO BELEN",
            "recruiter_name": "Julian",
            "public": false,
            "public_url": null,
            "public_shares": [],
            "to_complete": true,
            "created_at": "2025-05-21 13:01:07",
            "updated_at": "2025-05-21 13:01:07",
            "entries": [
                {
                    "id": "e0aa57d4-b9c1-4f4d-9b85-76d81141d4e1",
                    "field_id": "61fd238a-8ddc-4723-83fc-ca1f9111feab",
                    "field_name": "Screening",
                    "field_type": "textarea",
                    "description": "Aca se escribe el screning del candidato",
                    "value": null,
                    "updated_at": "2025-05-21 13:01:07"
                },
                {
                    "id": "f3374be2-7ff0-4996-9f48-c483a72a3248",
                    "field_id": "effc7c85-05f3-4880-be80-5b9dc03e8aed",
                    "field_name": "Remuneración actual",
                    "field_type": "number",
                    "description": "Aca se aclara la remuneración actual y se aclara pesos o dolar ",
                    "value": null,
                    "updated_at": "2025-05-21 13:01:07"
                },
                {
                    "id": "2c51e4a8-8f9b-4f71-b10b-0e0c53dd256a",
                    "field_id": "3c67ed06-bc5d-4b20-ada9-0384b393a3c2",
                    "field_name": "Remuneración Pretendida ",
                    "field_type": "number",
                    "description": "Aca se aclara la RP y se aclara pesos o dolar ",
                    "value": null,
                    "updated_at": "2025-05-21 13:01:07"
                }
            ],
            "responses": []
        }
    ],
    "available_templates": [
        {
            "id": "dd77d146-b844-4414-9c2a-bb47dc640bf9",
            "name": "Formulario de rechazo"
        },
        {
            "id": "20ee3334-157f-4b27-bad2-986a8c8ac7c8",
            "name": "Condiciones acordadas entre candidato y Trabajo"
        },
        {
            "id": "4325747c-71a7-4da4-a05a-ee5adce3f8c9",
            "name": "Screening MODELO BELEN"
        },
        {
            "id": "21ad3f48-e2d3-4eeb-a06e-24f3f17eb592",
            "name": "Company DNA"
        },
        {
            "id": "4273b7b2-d15b-4da2-b9c8-d096d2590916",
            "name": "Candidate Experience"
        },
        {
            "id": "9743b8f5-d706-4693-9e42-e40973d6344f",
            "name": "Screening - Datos Basicos"
        },
        {
            "id": "2a6e9153-1450-471e-ae53-b58be5e50cd5",
            "name": "Feedback Técnico"
        },
        {
            "id": "5d06a9b8-ae9e-4690-b7d7-affb1e617c92",
            "name": "Formulario de fecha de entrevista"
        },
        {
            "id": "6bdfe2f8-112f-4735-9e7c-6900f376bc30",
            "name": "Resultado de agente"
        },
        {
            "id": "36c1c7d5-f5dd-4ea3-9af0-2fc54d348077",
            "name": "Agente - Default"
        }
    ]
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Header con título del candidato y botón */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-semibold">
            Formularios 
          </h2>
        <AddCandidateForm templates={data.available_templates} />
        </div>

        {/* Renderizar cada scoreboard */}
        {data.scoreboards.map((scoreboard) => (
          <Card key={scoreboard.id}>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>{scoreboard.template_name}</CardTitle>
                <CardDescription>
                  Actualizado: {scoreboard.updated_at} | Recruiter: {scoreboard.recruiter_name}
                </CardDescription>
              </div>

              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:text-green-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Compartir</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Editar</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Eliminar</TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Renderizar entries de cada scoreboard */}
              {scoreboard.entries.map((entry) => (
                <div key={entry.id}>
                  <h4 className="text-sm font-medium text-gray-700">
                    {entry.field_name}
                  </h4>
                  <p className="text-sm">
                    {entry.value || "-"}
                  </p>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
                scoreboard.to_complete 
                  ? "text-yellow-700 bg-yellow-100" 
                  : "text-green-700 bg-green-100"
              }`}>
                <span className={`h-2 w-2 rounded-full ${
                  scoreboard.to_complete 
                    ? "bg-yellow-500" 
                    : "bg-green-500"
                }`}></span>
                {scoreboard.to_complete ? "Pendiente de completar" : "Completado"}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default CandidateScoreboard;