"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import AddCandidateComment from "./AddCandidateComment";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { fetchCandidateComments } from "@/state/api/Candidates/id/FetchCandidateComments";

export default function CandidateComments() {
  const dispatch = useAppDispatch();

  const { regularComments, technicalComments, loading, error, loaded } =
    useAppSelector((state) => state.candidateComments);

  const [tab, setTab] = useState<"regular" | "technical">("regular");

  // Llama al fetch solo si no está cargado
  useEffect(() => {
    if (!loaded) {
      fetchCandidateComments(dispatch);
    }
  }, [dispatch, loaded]);

  const currentComments =
    tab === "regular" ? regularComments : technicalComments;

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

        {loading ? (
          <p className="text-gray-500">Cargando comentarios...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : currentComments.length === 0 ? (
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
                  {"text" in comment ? comment.text : comment.comment}
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
