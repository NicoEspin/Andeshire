"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableColumnsVisibility } from "./CandidatesView";

type TableConfigProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  columns: TableColumnsVisibility;
  setColumns: Dispatch<SetStateAction<TableColumnsVisibility>>;
};

export default function TableConfiguration({
  open,
  setOpen,
  columns,
  setColumns,
}: TableConfigProps) {
  const toggleColumn = (key: keyof TableColumnsVisibility) => {
    setColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurar columnas</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {Object.entries(columns).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm">{key}</span>
              <Switch
                checked={value}
                onCheckedChange={() =>
                  toggleColumn(key as keyof TableColumnsVisibility)
                }
              />
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="default"
            className="bg-purple-700 hover:bg-purple-800 text-white"
            onClick={() => setOpen(false)}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
