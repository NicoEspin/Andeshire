import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";
import { Job } from "../../types/JobTypes";
import { useTranslations } from "next-intl";

interface Props {
  job: Job;
}

const JobValidationCriteriaCard = ({ job }: Props) => {
  const t = useTranslations("JobId.Details.ValidationCriteria");
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-primary"> {t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div>
          <p className="font-medium text-muted-foreground mb-1">
            {t("requiredTechnologies")}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(job.technical_requirements.technologies).map(
              ([tech, duration]) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {tech.toUpperCase()} - {duration.years} {t("years")}
                </Badge>
              )
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium">
            {" "}
            {t("englishLevel")}
          </span>
          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
            {job.english_level}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium">
            {t("workModality")}
          </span>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Badge className="bg-purple-100 text-purple-800 border border-purple-300">
              {job.modality}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobValidationCriteriaCard;
