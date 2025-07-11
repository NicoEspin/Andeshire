"use client";

import React from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type FormDetailsProps = {
  name: string;
  description: string;
};

export const FormDetails = ({ name, description }: FormDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
         <Button size={"icon"} variant={"outline"} className="cursor-pointer">
          <Eye className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{name}</DialogTitle>
          <DialogDescription className="mt-2 text-gray-700">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
