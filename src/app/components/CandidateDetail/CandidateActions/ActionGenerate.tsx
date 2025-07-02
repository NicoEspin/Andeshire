"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X, Plus, Settings, FileX } from "lucide-react";

export default function ActionGeneratePDF() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir Drawer */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer transition-colors 
          hover:bg-gray-100 hover:text-purple-700"
      >
        <Settings className="w-4 h-4" />
        Generar
      </Button>

      {/* Drawer lateral derecho */}
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="w-full max-w-xs h-full p-0 fixed right-0 top-0 bottom-0 flex flex-col shadow-lg bg-white">
          {/* Header */}
          <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
            <DrawerTitle className="text-base font-semibold text-white">
              PDFs Generados
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-purple-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>

          {/* Contenido vacío */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
            <FileX className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">
              No hay PDFs generados para este candidato
            </p>
          </div>

          {/* Footer con botón */}
          <div className="px-4 py-3 border-t">
            <Button
              variant="default"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crear nuevo
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
