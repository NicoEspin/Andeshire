// app/companies/[id]/page.tsx

import CompaniesDetail from "./CompaniesDetail";
import companiesList from "../data/companiesList.json";

type Props = {
  params: { id: string };
};

export default function CompanyPage({ params }: Props) {
  const company = companiesList.companies.find((c) => c.id === params.id);

  if (!company) {
    return <div className="p-8">Empresa no encontrada</div>;
  }

  const jobsMock = [
    {
      id: "1",
      title: "Sr Ruby",
      updated_at: "2025-03-31T21:57:00Z",
    },
    {
      id: "2",
      title: "Testing example django engineer",
      updated_at: "2025-03-12T13:40:00Z",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <CompaniesDetail
        name={company.name}
        email={company.email}
        description={company.description}
        tags={["PROSPECTO"]}
        files={[]} // Mock sin archivos
        jobs={company.jobs_count > 0 ? jobsMock : []}
      />
    </div>
  );
}
