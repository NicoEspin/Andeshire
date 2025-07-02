"use client";

import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  User,
  CalendarDays,
  Briefcase,
  Linkedin,
  Link,
  FileText,
  Upload,
  X,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";

import CandidateCustomEdit from "./CandidateCustomEdit";

type ActionEditProps = {
  candidate: CandidateDetail;
};

export default function ActionEdit({ candidate }: ActionEditProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Función para validar campos nulos y convertirlos a string vacío
  const validateField = (value: any): string => {
    return value === null || value === undefined ? "" : String(value);
  };

  const [formData, setFormData] = useState({
    name: validateField(candidate.name),
    email: validateField(candidate.email),
    phone_number: validateField(candidate.phone_number),
    location: validateField(candidate.location),
    age: validateField(candidate.age),
    date_of_birth: validateField(candidate.date_of_birth),
    current_job_title: validateField(candidate.current_job_title),
    previous_job_title: validateField(candidate.previous_job_title),
    years_in_last_job: validateField(candidate.years_in_last_job),
    linkedin: validateField(candidate.linkedin),
    other_url: validateField(candidate.other_url),
    category: validateField(candidate.category),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      if (file) {
        alert("Por favor selecciona un archivo PDF válido");
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById("cv-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSave = () => {
    console.log("Guardar cambios:", formData);
    if (selectedFile) {
      console.log("Nuevo archivo CV:", selectedFile);
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este candidato?")
    ) {
      console.log("Eliminar candidato:", candidate.id);
      setOpen(false);
    }
  };

  const inputFields = [
    { key: "name", label: "Nombre", icon: User, type: "text" },
    { key: "email", label: "Email", icon: Mail, type: "email" },
    { key: "phone_number", label: "Teléfono", icon: Phone, type: "tel" },
    { key: "location", label: "Ubicación", icon: MapPin, type: "text" },
    { key: "age", label: "Edad", icon: User, type: "number" },
    {
      key: "date_of_birth",
      label: "Fecha de nacimiento",
      icon: CalendarDays,
      type: "date",
    },
    {
      key: "current_job_title",
      label: "Puesto actual",
      icon: Briefcase,
      type: "text",
    },
    {
      key: "previous_job_title",
      label: "Puesto anterior",
      icon: Briefcase,
      type: "text",
    },
    {
      key: "years_in_last_job",
      label: "Años en último trabajo",
      icon: CalendarDays,
      type: "number",
    },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
    { key: "other_url", label: "Otra URL", icon: Link, type: "url" },
    { key: "category", label: "Categoría", icon: Briefcase, type: "text" },
  ];

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-yellow-100 hover:text-yellow-700"
      >
        <Pencil className="w-4 h-4" />
        Editar
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[700px] max-h-[80vh] flex flex-col bg-gradient-to-br bg-white dark:from-slate-900 dark:to-slate-800 border-0 shadow-2xl">
          <DialogHeader className="pb-6 border-b border-slate-200 ">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Editar Candidato
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 mb-2">
              {inputFields.map(({ key, label, icon: Icon, type }) => (
                <div key={key} className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Icon className="w-4 h-4 text-slate-500" />
                    {label}
                  </Label>
                  <Input
                    type={type}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500"
                    placeholder={`Ingresa ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* CV Upload Section */}
              <div className="md:col-span-2 space-y-4">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Curriculum Vitae (PDF)
                </Label>

                {/* Current CV Link */}
                {candidate.cv_url && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <a
                      href={candidate.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline text-sm font-medium transition-colors"
                    >
                      Ver CV actual
                    </a>
                  </div>
                )}

                {/* File Upload Area */}
                <div className="relative">
                  <input
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-200 cursor-pointer group">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                        <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {selectedFile
                            ? "Archivo seleccionado"
                            : "Haz clic para subir un nuevo CV"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Solo archivos PDF (máx. 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected File Display */}
                {selectedFile && (
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="h-auto p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <CandidateCustomEdit candidate={candidate} />
          </div>

          <DialogFooter className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700 mt-6">
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar candidato
            </Button>

            <div className="flex gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Guardar cambios
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
