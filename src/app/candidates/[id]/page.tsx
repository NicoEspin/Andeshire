"use client";

import CandidateProfile from "./candidate-profile";
import CandidateSidebar from "./components/CandidateSidebar";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  return (
    <section className="flex justify-between gap-10">
      <CandidateProfile id={params.id} />
      {view && <CandidateSidebar view={view} />}
    </section>
  );
}
