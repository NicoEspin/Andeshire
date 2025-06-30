"use client";

import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Flag, Building2, Linkedin, User } from "lucide-react";

interface CandidateHeaderProps {
  candidate: CandidateDetail;
}

export default function CandidateHeader({ candidate }: CandidateHeaderProps) {
  const name = candidate.name || "Sin nombre";
  const email = candidate.email || "Sin email";
  const phone = candidate.phone_number || "Sin teléfono";
  const country = candidate.country || "-";
  const city = candidate.city && candidate.city !== "null" ? candidate.city : "-";
  const title = candidate.current_job_title || "Sin puesto";
  const experience =
    candidate.years_in_last_job && candidate.years_in_last_job !== "null"
      ? `${candidate.years_in_last_job} años`
      : "Sin datos";
  const linkedin = candidate.linkedin?.startsWith("http")
    ? candidate.linkedin
    : `https://${candidate.linkedin}`;
  const recruiter = candidate.recruiter?.name || "Sin recruiter";

  return (
    <div className="flex flex-col gap-6 border-b pb-6">
      {/* Top: Avatar & Basic Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl shadow">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500">
              {title} — {experience}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {candidate.tags && candidate.tags.length > 0 ? (
            candidate.tags.map((tag) => (
              <Badge
                key={tag.id}
                style={{
                  backgroundColor: `${tag.color}22`,
                  color: `${tag.color}`,
                }}
                className="hover:opacity-80"
              >
                {tag.name}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary">Sin tags</Badge>
          )}
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
          >
            + Añadir tag
          </Button>
        </div>
      </div>

      {/* Contact & Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">Email:</span>
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">Teléfono:</span>
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Flag className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">País:</span>
          <span>{country}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Building2 className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">Ciudad:</span>
          <span>{city}</span>
        </div>
        {candidate.linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Linkedin className="w-4 h-4" />
            <span className="font-semibold">LinkedIn:</span>
            <span>Perfil</span>
          </a>
        )}
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">Recruiter:</span>
          <span>{recruiter}</span>
        </div>
      </div>
    </div>
  );
}
