"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockDataImage } from "../../data/mockDataImage";
import { useTranslations } from "next-intl";

type Props = {};

const Images = (props: Props) => {
  const t = useTranslations("JobId.Description.Images");

  return (
    <div className="space-y-6">
      {/* Header con título, subtítulo y botón */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">{t("Title")}</h2>
          <p className="text-sm text-muted-foreground">{t("Subtitle")}</p>
        </div>
        <Button variant="default" className="flex gap-2">
          <Plus className="w-4 h-4" /> {t("GenerateButton")}
        </Button>
      </div>

      {/* Tarjetas de imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockDataImage.images.map((img) => (
          <Card key={img.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={img.image_url}
                alt="Generated"
                className="w-full h-auto object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground px-4 py-2">
              <span>
                {t("CreatedLabel")}: {new Date(img.created_at).toLocaleString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Images;
