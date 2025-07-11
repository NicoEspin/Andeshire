"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

type EditCompanyProps = {
  name: string;
  email: string;
  phone?: string;
  description: string;
  benefits?: string;
  ownerPhone?: string;
  address?: string;
};

export default function EditCompany({
  name,
  email,
  phone = "",
  description,
  benefits = "",
  ownerPhone = "",
  address = "",
}: EditCompanyProps) {
  const t = useTranslations("CompanyDetails.EditCompany");
  const [open, setOpen] = useState(false);

  const [companyName, setCompanyName] = useState(name);
  const [companyEmail, setCompanyEmail] = useState(email);
  const [companyPhone, setCompanyPhone] = useState(phone);
  const [companyDescription, setCompanyDescription] = useState(description);
  const [companyBenefits, setCompanyBenefits] = useState(benefits);
  const [companyOwnerPhone, setCompanyOwnerPhone] = useState(ownerPhone);
  const [companyAddress, setCompanyAddress] = useState(address);

  const handleSave = () => {
    console.log({
      companyName,
      companyEmail,
      companyPhone,
      companyDescription,
      companyBenefits,
      companyOwnerPhone,
      companyAddress,
    });
    setOpen(false);
  };

  return (
    <>
      <Button className="cursor-pointer" size="lg" variant="default" onClick={() => setOpen(true)}>
        <Pencil className="w-5 h-5 mr-2" />
        {t("buttonLabel")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {t("dialogTitle")}
            </DialogTitle>
            <p className="text-muted-foreground text-sm">
              {t("dialogDescription")}
            </p>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                {t("fields.name")} <span className="text-red-500">{t("requiredIndicator")}</span>
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  {t("fields.email")} <span className="text-red-500">{t("requiredIndicator")}</span>
                </label>
                <Input
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  {t("fields.phone")}
                </label>
                <Input
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                {t("fields.description")} <span className="text-red-500">{t("requiredIndicator")}</span>
              </label>
              <Textarea
                rows={4}
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                {t("fields.benefits")}
              </label>
              <Textarea
                rows={2}
                value={companyBenefits}
                onChange={(e) => setCompanyBenefits(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  {t("fields.ownerPhone")}
                </label>
                <Input
                  value={companyOwnerPhone}
                  onChange={(e) => setCompanyOwnerPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  {t("fields.address")}
                </label>
                <Input
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button className="cursor-pointer" onClick={handleSave}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
