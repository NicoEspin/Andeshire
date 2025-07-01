"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageSquare } from "lucide-react";
import AddCandidateComment from "./AddCandidateComment";

// Tipos exactos de tu API
type RegularComment = {
  id: string;
  text: string;
  recruiter: string;
  created_at: string;
  type: string; // "Regular"
};

type TechnicalComment = {
  id: string;
  comment: string;
  recruiter: string;
  created_at: string;
  type: string; // "Technical"
};

// Mock data EXACTA de tu API
const mockData: {
  status: string;
  data: {
    regular_comments: RegularComment[];
    technical_comments: TechnicalComment[];
  };
} = {
  status: "success",
  data: {
    regular_comments: [
      {
        id: "b3379483-8259-4d93-af11-00ca09239eca",
        text: "Este candidato tiene buena actitud.",
        recruiter: "Mauricio",
        created_at: "2025-06-26 15:12:55",
        type: "Regular",
      },
    ],
    technical_comments: [
      {
        id: "23a5802e-2e06-4a89-ab1d-44bc098235c6",
        comment: "Buen conocimiento de APIs REST y manejo de bases de datos.",
        recruiter: "Mauricio",
        created_at: "2025-07-01 13:51:24",
        type: "Technical",
      },
      // Simula infinitos:
      {
        id: "2",
        comment: "Dominio avanzado de Python y frameworks como Django.",
        recruiter: "Mauricio",
        created_at: "2025-07-01 14:00:00",
        type: "Technical",
      },
    ],
  },
};

export default function CandidateComments() {
  const [tab, setTab] = useState<"regular" | "technical">("regular");

  const { regular_comments, technical_comments } = mockData.data;

  const currentComments =
    tab === "regular" ? regular_comments : technical_comments;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle className="text-2xl font-semibold">Comentarios</CardTitle>
        <div className="flex flex-col md:flex-row gap-2">
          <AddCandidateComment type="regular" />
          <AddCandidateComment type="technical" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="regular" className="w-full mb-4">
          <TabsList>
            <TabsTrigger
              value="regular"
              onClick={() => setTab("regular")}
              className={tab === "regular" ? "text-purple-700" : ""}
            >
              Personales
            </TabsTrigger>
            <TabsTrigger
              value="technical"
              onClick={() => setTab("technical")}
              className={tab === "technical" ? "text-purple-700" : ""}
            >
              Técnicos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Lista de comentarios */}
        {currentComments.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
            <MessageSquare className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-500">
              No hay comentarios en esta categoría.
            </p>
          </Card>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {currentComments.map((comment) => (
              <Card key={comment.id} className="p-4">
                <p className="text-sm text-gray-800 mb-2">
                  {tab === "regular"
                    ? (comment as RegularComment).text
                    : (comment as TechnicalComment).comment}
                </p>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Por: {comment.recruiter}</span>
                  <span>
                    {new Date(comment.created_at).toLocaleString("es-AR")}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
