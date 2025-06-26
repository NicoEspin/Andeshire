"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Plus, SlidersHorizontal } from "lucide-react";


const mockCandidates = [
  {
    id: 1,
    name: "José Peixoto",
    title: "Senior Software Engineer",
    recruiter: "Postulados desde el portal",
    tag: "ROTACIÓN NORMAL",
    created_at: "23 June 2025",
    category: "Backend",
    location: "São Paulo, State of São Paulo",
  },
  {
    id: "abfad20f-c0c8-4f6e-a7fe-e2532d1afbd9",
    name: "Sebastián",
    title: "Ingeniero de Software",
    recruiter: "Postulados desde el portal",
    tag: "ROTACIÓN NORMAL",
    created_at: "23 June 2025",
    category: "Fullstack",
    location: "Buenos Aires, Buenos Aires",
  },
];

export default function CandidatesList() {
  const [search, setSearch] = useState("");

  const filteredCandidates = mockCandidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 pt-6 pb-4 backdrop-blur border-b border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Buscar candidatos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2.5 rounded-md border border-gray-300 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 active:scale-[0.98] transition-all">
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 active:scale-[0.97] transition-transform">
            <Plus className="w-4 h-4" />
            Añadir Candidato
          </button>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {filteredCandidates.map((candidate) => (
          <Link href={`/candidates/${candidate.id}`} key={candidate.id}>
            <div className="group flex items-start justify-between p-5 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:bg-gray-50 transition-all duration-200 ease-out cursor-pointer">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                  {candidate.name}
                </h2>
                <p className="text-sm text-gray-700">{candidate.title}</p>
                <div className="flex flex-col flex-wrap gap-2 mt-2 text-sm">
                  <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit">
                    {candidate.category}
                  </span>
                  <span className="text-gray-500">
                    <b>Creado por:</b> {candidate.recruiter}
                  </span>
                  <span className="text-gray-400">
                    · {candidate.created_at}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit">
                    {candidate.tag}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
