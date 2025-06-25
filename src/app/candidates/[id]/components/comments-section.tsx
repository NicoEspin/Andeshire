"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { MessageSquare, User, Code, Calendar } from "lucide-react";

interface Comment {
  id: string;
  type: "personal" | "tecnico";
  author: string;
  content: string;
  timestamp: string;
}

export function CommentsSection() {
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      type: "personal",
      author: "María González",
      content:
        "El candidato mostró muy buena actitud durante la entrevista inicial. Se ve motivado y con ganas de aprender nuevas tecnologías.",
      timestamp: "2025-01-19T14:30:00Z",
    },
    {
      id: "2",
      type: "tecnico",
      author: "Carlos Rodríguez",
      content:
        "Tiene experiencia sólida en JavaScript y React. Le falta experiencia en Django pero muestra capacidad de adaptación rápida.",
      timestamp: "2025-01-19T15:45:00Z",
    },
    {
      id: "3",
      type: "personal",
      author: "Ana Martínez",
      content:
        "Excelente comunicación y trabajo en equipo. Ha demostrado liderazgo en proyectos anteriores.",
      timestamp: "2025-01-20T09:15:00Z",
    },
  ]);

  const [activeTab, setActiveTab] = useState("todos");

  const handleAddPersonalComment = () => {
    console.log("Añadir comentario personal");
    // Aquí iría la lógica para abrir un modal o formulario
  };

  const handleAddTechnicalComment = () => {
    console.log("Añadir comentario técnico");
    // Aquí iría la lógica para abrir un modal o formulario
  };

  const filteredComments = comments.filter((comment) => {
    if (activeTab === "todos") return true;
    if (activeTab === "personal") return comment.type === "personal";
    if (activeTab === "tecnico") return comment.type === "tecnico";
    return true;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto" data-driver-id="analisis">
      <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold flex items-center gap-3">
              <MessageSquare className="h-6 w-6 hover:rotate-12 transition-transform duration-300" />
              Comentarios
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={handleAddPersonalComment}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
              >
                <User className="h-4 w-4" />
                Añadir comentario personal
              </Button>
              <Button
                onClick={handleAddTechnicalComment}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-all duration-200"
              >
                <Code className="h-4 w-4" />
                Añadir comentario técnico
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger
                value="todos"
                className="flex items-center gap-2 hover:scale-105 transition-all duration-200 data-[state=active]:shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                Todos
                <Badge variant="outline" className="ml-1 text-xs">
                  {comments.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="flex items-center gap-2 hover:scale-105 transition-all duration-200 data-[state=active]:shadow-md"
              >
                <User className="h-4 w-4" />
                Personal
                <Badge variant="outline" className="ml-1 text-xs">
                  {comments.filter((c) => c.type === "personal").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="tecnico"
                className="flex items-center gap-2 hover:scale-105 transition-all duration-200 data-[state=active]:shadow-md"
              >
                <Code className="h-4 w-4" />
                Técnico
                <Badge variant="outline" className="ml-1 text-xs">
                  {comments.filter((c) => c.type === "tecnico").length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {filteredComments.length > 0 ? (
                  filteredComments.map((comment, index) => (
                    <Card
                      key={comment.id}
                      className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              comment.type === "personal"
                                ? "bg-blue-50 hover:bg-blue-100"
                                : "bg-green-50 hover:bg-green-100"
                            } transition-colors duration-200`}
                          >
                            {comment.type === "personal" ? (
                              <User
                                className={`h-4 w-4 ${
                                  comment.type === "personal"
                                    ? "text-blue-600"
                                    : "text-green-600"
                                }`}
                              />
                            ) : (
                              <Code
                                className={`h-4 w-4 ${
                                  comment.type === "personal"
                                    ? "text-blue-600"
                                    : "text-green-600"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">
                                  {comment.author}
                                </h4>
                                <Badge
                                  variant={
                                    comment.type === "personal"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs hover:scale-105 transition-transform duration-200"
                                >
                                  {comment.type === "personal"
                                    ? "Personal"
                                    : "Técnico"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(comment.timestamp)}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed hover:text-gray-900 transition-colors duration-200">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <MessageSquare className="h-16 w-16 text-gray-300 mx-auto animate-pulse" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        No hay comentarios
                      </h3>
                      <p className="text-gray-500 mt-1">
                        {activeTab === "todos"
                          ? "Aún no se han añadido comentarios para este candidato."
                          : `No hay comentarios de tipo ${
                              activeTab === "personal" ? "personal" : "técnico"
                            }.`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
