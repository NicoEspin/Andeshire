import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Users,
  CheckCircle2,
  ExternalLink,
  Copy,
  Workflow,
} from "lucide-react";
import { Job } from "../../types/JobTypes";
import { format } from "date-fns";

interface Props {
  job: Job;
}

const JobGeneralInfoCard = ({ job }: Props) => {
  const createdAt = format(new Date(job.created_at), "dd MMM yyyy");
  const daysOpen = Math.floor(
    (Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://andeshire.com/jobs/${job.id}`);
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Información general</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            Fecha de apertura:
          </div>
          <span>{createdAt}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            Período de aplicación:
          </div>
          <span>{daysOpen} días</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            Candidatos vinculados:
          </div>
          <span>5</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="w-4 h-4" />
            Estado:
          </div>
          <Badge className="bg-green-100 text-green-800 border border-green-200">
            Abierta
          </Badge>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Publicación en portal:</span>
          <span className="text-sm">{job.is_public ? "Sí" : "No"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Enlace público:</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://andeshire.com/jobs/${job.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" size="sm" className="text-blue-600">
                <ExternalLink className="w-4 h-4 mr-1" />
                Ver
              </Button>
            </a>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Workflow className="w-4 h-4" />
            Workflow:
          </div>
          <span className="text-sm">{job.stage_template_set.name}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobGeneralInfoCard;
