"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CloudUpload } from "lucide-react";

type AddCandidateFilesProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddCandidateFiles({
  open,
  onOpenChange,
}: AddCandidateFilesProps) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Aquí conectas con tu lógica de subida
    console.log({ file, description });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar archivo</DialogTitle>
        </DialogHeader>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center space-y-2">
      <CloudUpload className="size-10 text-purple-700" />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-sm text-gray-600 hover:underline"
          >
            Haz clic para seleccionar
          </label>
          <p className="text-xs text-gray-500">
            o arrastra y suelta un archivo
          </p>
          <p className="text-xs text-gray-500">Tamaño máximo: 10MB</p>
          <Input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción:
          </label>
          <Input
            placeholder="Descripción del archivo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-purple-700 text-white hover:bg-purple-800"
            onClick={handleSubmit}
          >
            Subir Archivo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
