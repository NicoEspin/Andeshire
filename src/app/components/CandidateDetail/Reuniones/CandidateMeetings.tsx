"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Users, LinkIcon, Info } from "lucide-react";
import { parseISO } from "date-fns";
import AddCandidateMeet from "./AddCandidateMeet";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { fetchCandidateMeetings } from "@/state/api/Candidates/id/FetchCandidateMeetings";
import { useTranslations } from "next-intl";

// --- ✅ Función robusta para detectar links con o sin http ---
export function parseDescriptionWithLinks(description: string) {
  const urlRegex =
    /\b(https?:\/\/[^\s\n;,]+)|(andesire\.com\/[^\s\n;,]+)|(andeshi?re\.com\/[^\s\n;,]+)/gi;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  let match;
  let index = 0;

  while ((match = urlRegex.exec(description)) !== null) {
    const [found] = match;
    const start = match.index;

    if (lastIndex < start) {
      parts.push(
        <span key={`text-${index}`}>{description.slice(lastIndex, start)}</span>
      );
      index++;
    }

    const href = /^https?:\/\//.test(found) ? found : `https://${found}`;

    parts.push(
      <a
        key={`link-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-700 underline break-all"
      >
        {found}
      </a>
    );
    index++;

    lastIndex = start + found.length;
  }

  if (lastIndex < description.length) {
    parts.push(
      <span key={`text-${index}`}>{description.slice(lastIndex)}</span>
    );
  }

  return parts;
}

const CandidateMeetings = () => {
  const t = useTranslations("CandidateDetail.Meetings");
  const dispatch = useAppDispatch();
  const { meetings, loading, error, loaded } = useAppSelector(
    (state) => state.candidateMeeting
  );

  useEffect(() => {
    if (!loaded) {
      fetchCandidateMeetings(dispatch);
    }
  }, [dispatch, loaded]);

  const hasMeetings = meetings && meetings.length > 0;

  const formatDateTimeAR = (dateString: string) => {
    const date = parseISO(dateString);
    return date.toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{t("Title")}</h2>
        <AddCandidateMeet />
      </div>

      {loading && (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-600">{t("Loading")}</p>
        </Card>
      )}

      {error && (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-red-600">{t("Error", { error })}</p>
        </Card>
      )}

      {!loading && !error && (
        <div className="grid gap-4">
          {hasMeetings ? (
            meetings.map((meeting) => (
              <Card
                key={meeting.id}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-purple-700 flex items-center gap-2">
                    <CalendarClock className="w-5 h-5" />
                    {meeting.summary}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {formatDateTimeAR(meeting.start_time)} -{" "}
                    {formatDateTimeAR(meeting.end_time)}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700 whitespace-pre-line">
                    {parseDescriptionWithLinks(meeting.description)}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-purple-700">
                    <LinkIcon className="w-4 h-4" />
                    <a
                      href={meeting.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      {t("Join")}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-purple-700" />
                    {meeting.participants.map((p) => p.email).join(", ")}
                  </div>
                  <p className="text-xs text-gray-400">
                    {t("CreatedAt", {
                      date: formatDateTimeAR(meeting.created_at),
                    })}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <Info className="w-10 h-10 text-purple-700 mb-4" />
              <p className="text-gray-600">{t("NoMeetings")}</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateMeetings;
