"use client";

import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import FieldInfo from "./FieldInfo";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";

export default function AdvancedConfig() {
  const t = useTranslations("Settings.AdvancedSettings");

  return (
    <Card className="w-full space-y-6">
      <CardHeader>
        <CardTitle className="text-xl">{t("Title")}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Logo Placeholder */}
        <div className="space-y-2">
          <Label>Logo</Label>
          <div className="w-full h-32 border border-dashed flex items-center justify-center rounded-md text-muted-foreground">
            {t("LogoPlaceholder")}
          </div>
          <Button variant="outline">{t("ChangeLogo")}</Button>
        </div>

        {/* Switch: Activar portal de carreras */}
        <div className="flex items-center space-x-3">
          <Switch
            className="data-[state=checked]:bg-purple-600"
            id="careerPortal"
          />
          <div>
            <Label htmlFor="careerPortal" className="mb-1">
              {t("CareerPortalLabel")}
            </Label>
            <FieldInfo text={t("CareerPortalInfo")} />
          </div>
        </div>

        {/* Switch: Guardado automático de postulantes */}
        <div className="flex items-center space-x-3">
          <Switch
            className="data-[state=checked]:bg-purple-600"
            id="autoSaveApplicants"
          />
          <div>
            <Label htmlFor="autoSaveApplicants" className="mb-1">
              {t("AutoSaveApplicantsLabel")}
            </Label>
            <FieldInfo text={t("AutoSaveApplicantsInfo")} />
          </div>
        </div>

        {/* Prefijo */}
        <div className="space-y-2">
          <Label htmlFor="prefix">{t("PrefixLabel")}</Label>
          <Input id="prefix" placeholder={t("PrefixPlaceholder")} />
          <FieldInfo text={t("PrefixInfo")} />
        </div>

        {/* Prompt de comparación */}
        <div className="space-y-2">
          <Label htmlFor="promptComparison">{t("PromptComparisonLabel")}</Label>
          <Textarea
            id="promptComparison"
            rows={6}
            placeholder={t("PromptComparisonPlaceholder")}
          />
          <FieldInfo text={t("PromptComparisonInfo")} />
        </div>

        {/* Prompt de Heimdall */}
        <div className="space-y-2">
          <Label htmlFor="promptHeimdall">{t("PromptHeimdallLabel")}</Label>
          <Textarea
            id="promptHeimdall"
            rows={12}
            placeholder={t("PromptHeimdallPlaceholder")}
          />
          <FieldInfo text={t("PromptHeimdallInfo")} />
        </div>

        {/* Switch: Activar categorización de Heimdall */}
        <div className="flex items-center space-x-3">
          <Switch
            className="data-[state=checked]:bg-purple-600"
            id="heimdallCategorization"
          />
          <div>
            <Label htmlFor="heimdallCategorization" className="mb-1">
              {t("HeimdallCategorizationLabel")}
            </Label>
            <FieldInfo text={t("HeimdallCategorizationInfo")} />
          </div>
        </div>

        {/* Categorías IT / NO IT */}
        <h3 className="text-lg font-medium mb-[-1px]">{t("TagsTitle")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{t("IT")}</h4>
              <Button size="icon" variant="outline" className="cursor-pointer">
                <PlusCircle className="w-4 h-4 " />
              </Button>
            </div>
            <div className="space-y-2">
              {["Fullstack", "Functional Analyst", "Business Analyst", "Salesforce"].map((cat) => (
                <div
                  key={cat}
                  className="flex items-center justify-between border rounded-md px-4 py-2"
                >
                  <span>{cat}</span>
                  <Button size="icon" variant="ghost" className="cursor-pointer">
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="text-center text-muted-foreground">...</div>
            </div>
          </div>

          {/* NO IT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{t("NoIT")}</h4>
              <Button size="icon" variant="outline" className="cursor-pointer">
                <PlusCircle className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {["Comercio", "Plomería", "Agronomía", "Economía"].map((cat) => (
                <div
                  key={cat}
                  className="flex items-center justify-between border rounded-md px-4 py-2"
                >
                  <span>{cat}</span>
                  <Button size="icon" variant="ghost" className="cursor-pointer">
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="text-center text-muted-foreground">...</div>
            </div>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant={"outline"} className="cursor-pointer">
              <Pencil className="w-4 h-4" />
              {t("EditPublicPage")}
            </Button>
            <Button variant={"outline"} className="cursor-pointer">
              <Eye className="w-4 h-4" />
              {t("ViewPublicPage")}
            </Button>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
            {t("SaveChanges")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
