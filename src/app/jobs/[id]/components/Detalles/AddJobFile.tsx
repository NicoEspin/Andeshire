"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, UploadCloud, X } from "lucide-react";

export default function AddJobFile() {
  const [file, setFile] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Aquí pones la lógica para subir archivo: POST API, etc.
    console.log("Archivo:", file);
    console.log("Descripción:", description);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="default"
          className="flex items-center gap-2 rounded-md shadow-md cursor-pointer bg-purple-700 hover:bg-purple-800 text-white"
        >
          <Plus className="w-4 h-4" />
          Añadir Archivo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar archivo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="border-dashed border-2 border-muted-foreground/30 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer">
            <UploadCloud className="w-8 h-8 text-purple-700 mb-2" />
            <Label
              htmlFor="file-upload"
              className="text-sm text-muted-foreground"
            >
              Haz clic para seleccionar <br /> o arrastra y suelta un archivo
            </Label>
            <p className="text-xs text-muted-foreground">Tamaño máximo: 10MB</p>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción:</Label>
            <Input
              id="description"
              placeholder="Descripción del archivo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline">Cancelar</Button>
          <Button
            onClick={handleUpload}
            className="bg-purple-700 text-white hover:bg-purple-800"
          >
            Subir Archivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
