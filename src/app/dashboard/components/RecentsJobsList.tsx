"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Job = {
  id: string;
  title: string;
  company_name: string;
  created_at: string;
};

export default function RecentsJobsList({ jobs }: { jobs: Job[] }) {
  return (
    <ScrollArea className="h-72 overflow-y-auto pr-2">
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="text-purple-600 bg-purple-200">{job.company_name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{job.title}</div>
                <div className="text-muted-foreground text-xs">
                  {job.company_name}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {formatDistanceToNow(new Date(job.created_at), {
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
