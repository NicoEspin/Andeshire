import FormDetails from "./FormDetails";
import formList from "../data/formlist.json";

type Props = {
  params: { id: string };
};

export default function FormPage({ params }: Props) {
  const { id } = params;
  const form = formList.templates.find((template) => template.id === id);

  if (!form) {
    return <div className="p-8 text-center text-muted-foreground">Formulario no encontrado</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <FormDetails
        name={form.name}
        description={form.description}
        recruiter={form.recruiter_name}
        customFields={form.custom_fields}
      />
    </div>
  );
}
