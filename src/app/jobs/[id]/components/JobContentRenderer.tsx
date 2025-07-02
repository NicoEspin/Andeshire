import { CandidatesByStage } from "../types/CandidatesByStagesTypes";
import { Job } from "../types/JobTypes";
import { Stage } from "../types/StagesTypes";
import ApplicantsView from "./Aplicantes/ApplicantsView";
import CandidatesView from "./Candidatos/CandidatesView";
import DescriptionView from "./Descripcion/DescriptionView";
import DetailsView from "./Detalles/DetailsView";
import HeimdallView from "./Heimdall/HeimdallView";
import CustomView from "./Personalizados/CustomView";

interface JobContentRendererProps {
  activeTab: string;
  job: Job;
  stages: Stage[];
  candidatesByStage: CandidatesByStage;
}

export default function JobContentRenderer({
  activeTab,
  job,
  stages,
  candidatesByStage,
}: JobContentRendererProps) {
  switch (activeTab) {
    case "detalles":
      return <DetailsView job={job} stages={stages} />;
    case "descripcion":
      return <DescriptionView job={job}/>;
    case "candidatos":
      return (
        <CandidatesView stages={stages} 
        candidateByStage={candidatesByStage} />
      );
    case "heimdall":
      return <HeimdallView />;
    case "aplicantes":
      return <ApplicantsView />;
    case "personalizados":
      return <CustomView job={job} />;
    default:
      return <div className="p-4 text-gray-500">Selecciona una pestaña</div>;
  }
}
