"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fetchJobStages } from "@/state/api/Jobs/Id/FetchJobStagesSlice";

export default function LinkCandidateStage() {
  const dispatch = useAppDispatch();
  const { stages, loading } = useAppSelector((state) => state.jobStages);

  const [open, setOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>("");

  /** 🔄 Fetch de stages cuando se abre el modal */
  useEffect(() => {
    if (open && !stages.length) {
      fetchJobStages(dispatch);
    }
  }, [open, stages.length, dispatch]);

  const handleConfirm = () => {
    console.log("Stage seleccionado:", selectedStage);
    // Aquí iría tu lógica de vinculación
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
        >
          Vincular
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Seleccionar etapa para vincular</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Etapa</label>
            <Select
              value={selectedStage}
              onValueChange={setSelectedStage}
              disabled={loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una etapa" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.name}>
                    {stage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Atrás
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedStage}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
