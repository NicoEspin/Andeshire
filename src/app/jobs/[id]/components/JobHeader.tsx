"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  MapPin,
  GraduationCap,
  ShieldCheck,
  Building2,
  CalendarDays,
} from "lucide-react";
import { Job } from "@/app/jobs/[id]/types/JobTypes";
import { useTranslations } from "next-intl";

// Helper para formatear fechas a dd/mm/yyyy
const formatDateAR = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

interface JobHeaderProps {
  job: Job;
}

export default function JobHeader({ job }: JobHeaderProps) {
  const t = useTranslations("JobId");
  const getModalityIcon = (modality: string) => {
    switch (modality.toLowerCase()) {
      case "remoto":
        return <Globe className="w-4 h-4 mr-1 text-blue-500" />;
      case "presencial":
        return <Building2 className="w-4 h-4 mr-1 text-rose-500" />;
      case "híbrido":
        return <MapPin className="w-4 h-4 mr-1 text-yellow-500" />;
      default:
        return <MapPin className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-950">
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            {/* Avatar circular con gradiente */}
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold text-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {job.company.name[0]}
            </motion.div>

            {/* Info principal */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {job.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {job.company.name}
              </p>

              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  {getModalityIcon(job.modality)}
                  {job.modality}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-violet-500" />
                  {job.english_level}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {job.category}
                </span>
              </div>
            </div>

            {/* Estado y fechas */}
            <div className="text-right space-y-1">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                {t("Header.status.active")}
              </Badge>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                <div className="flex items-center justify-end gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {t("Header.dates.created")} {formatDateAR(job.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {t("Header.dates.updated")} {formatDateAR(job.updated_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Tecnologías */}
          <div className="flex flex-wrap gap-2 text-sm">
            {Object.entries(job.technical_requirements.technologies).map(
              ([tech]) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-800 border border-indigo-200 hover:scale-105 transition-transform"
                >
                  {tech}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
