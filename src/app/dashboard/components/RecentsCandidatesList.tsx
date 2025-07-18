"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Candidate = {
  id: string;
  name: string;
  created_at: string;
};

export default function RecentsCandidatesList({ candidates }: { candidates: Candidate[] }) {
  return (
    <ScrollArea className="h-72 overflow-y-auto pr-2">
      <ul className="space-y-4">
        {candidates.map((candidate) => (
          <li key={candidate.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="text-purple-600 bg-purple-200">{candidate.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{candidate.name}</div>
                <div className="text-muted-foreground text-xs">
                  Candidato/a
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {formatDistanceToNow(new Date(candidate.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </Badge>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
