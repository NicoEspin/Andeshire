"use client";

import { CandidateDetail } from "@/app/jobs/[id]/types/CandidatesByStagesTypes";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { Mail, Phone, Flag, Building2, Linkedin, User } from "lucide-react";
import AddCandidateTags from "./AddCandidateTags";

interface CandidateHeaderProps {
  candidate: CandidateDetail;
}

export default function CandidateHeader({ candidate }: CandidateHeaderProps) {
  const t = useTranslations("CandidateDetail.Header");

  const name = candidate.name || t("NoName");
  const email = candidate.email || t("NoEmail");
  const phone = candidate.phone_number || t("NoPhone");
  const country = candidate.country || "-";
  const city =
    candidate.city && candidate.city !== "null" ? candidate.city : "-";
  const title = candidate.current_job_title || t("NoTitle");
  const experience =
    candidate.years_in_last_job && candidate.years_in_last_job !== "null"
      ? t("Years", { years: candidate.years_in_last_job })
      : t("NoExperience");
  const linkedin = candidate.linkedin?.startsWith("http")
    ? candidate.linkedin
    : `https://${candidate.linkedin}`;
  const recruiter = candidate.recruiter?.name || t("NoRecruiter");

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
            <Badge variant="secondary">{t("NoTags")}</Badge>
          )}
          <AddCandidateTags />
        </div>
      </div>

      {/* Contact & Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">{t("Email")}:</span>
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">{t("Phone")}:</span>
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Flag className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">{t("Country")}:</span>
          <span>{country}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Building2 className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">{t("City")}:</span>
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
            <span className="font-semibold">{t("LinkedIn")}:</span>
            <span>{t("LinkedInProfile")}</span>
          </a>
        )}
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">{t("Recruiter")}:</span>
          <span>{recruiter}</span>
        </div>
      </div>
    </div>
  );
}
