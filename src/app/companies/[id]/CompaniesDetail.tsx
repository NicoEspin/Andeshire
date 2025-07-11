"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Eye, Pencil, PlusCircle, Tags, FilePlus,  ArrowLeft } from "lucide-react";
import EditCompany from "./EditCompany";
import Link from "next/link";

type CompaniesDetailProps = {
  name: string;
  email: string;
  description: string;
  tags?: string[];
  files?: { id: string; name: string }[];
  jobs?: {
    id: string;
    title: string;
    updated_at: string;
  }[];
};

const CompaniesDetail = ({
  name,
  email,
  description,
  tags = ["PROSPECTO"],
  files = [],
  jobs = [],
}: CompaniesDetailProps) => {
  const t = useTranslations("CompanyDetails");

  return (
    <div className="space-y-8">
      {/* Card principal */}{" "}
      <Link href="/companies">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("BackButton")}
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <span className="font-semibold">{t("EmailLabel")}:</span> {email}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <Button variant="outline" size="sm" className="mt-4 cursor-pointer">
            <Tags className="w-4 h-4 mr-2" />
            {t("AddTags")}
          </Button>
        </CardContent>
      </Card>
      {/* Archivos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {t("FilesTitle")}
          </CardTitle>
          <Button className="cursor-pointer" variant="outline" size="sm">
            <FilePlus className="w-4 h-4 mr-2" />
            {t("AddFile")}
          </Button>
        </CardHeader>
        <CardContent>
          {files.length > 0 ? (
            <ul className="list-disc pl-6">
              {files.map((file) => (
                <li key={file.id}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">{t("NoFiles")}</p>
          )}
        </CardContent>
      </Card>
      {/* Trabajos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("JobsTitle", { company: name })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("JobTitle")}</TableHead>
                  <TableHead>{t("JobUpdated")}</TableHead>
                  <TableHead>{t("JobActions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>
                      {format(
                        new Date(job.updated_at),
                        "dd 'de' MMMM yyyy 'a las' HH:mm"
                      )}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        className="cursor-pointer"
                        size="icon"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        className="cursor-pointer"
                        size="icon"
                        variant="outline"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">{t("NoJobs")}</p>
          )}
        </CardContent>
      </Card>
      {/* Formularios */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {t("FormsTitle")}
          </CardTitle>
          <Button className="cursor-pointer" variant="outline" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            {t("AddForm")}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t("NoForms")}</p>
        </CardContent>
      </Card>
      {/* Card editar compañía */}
      <Card className="border-dashed">
        <CardContent className="flex justify-center py-8">
          <EditCompany name={name} email={email} description={description} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompaniesDetail;
