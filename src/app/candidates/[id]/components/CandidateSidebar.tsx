import React from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

type SidebarProps = {
  view: "heimdall" | "process-stages" | string;
};

export default function CandidateSidebar({ view }: SidebarProps) {
  const heimdallCandidates = [
    { initials: "GB", name: "Guadalupe Bel...", status: "APLICA" },
    { initials: "NG", name: "Nicolás Gordillo", status: "APLICA" },
    { initials: "RC", name: "Renzo Cancino", status: "NO APLICA" },
    { initials: "AR", name: "Alejandro Ra...", status: "NO APLICA" },
    { initials: "L", name: "Lucas", status: "NO APLICA" },
    { initials: "RD", name: "Rodrigo Dami...", status: "NO APLICA" },
    { initials: "DS", name: "Diego Sebasti...", status: "NO APLICA" },
    { initials: "AM", name: "Angel Mario P...", status: "NO APLICA" },
    { initials: "JP", name: "Juan Pablo Go...", status: "NO APLICA" },
    { initials: "CB", name: "Catherine Bust...", status: "NO APLICA" },
  ];

  const processStageCandidates = [
    {
      initials: "SB",
      name: "Sofía Belén Romero",
      email: "sofi.rom.rott@gmail.com",
      selected: true,
    },
    {
      initials: "JC",
      name: "Joaquín Cabrera",
      email: "jcabrera.rhh@gmail.com",
      selected: false,
    },
    {
      initials: "GB",
      name: "Guadalupe Belén González",
      email: "lic.gonzalezgb@gmail.com",
      selected: false,
    },
  ];

  return (
    <aside className="w-full max-w-lg h-screen sticky top-30 overflow-y-auto bg-white border-r border-gray-500 shadow-lg">
      {view === "heimdall" && (
        <>
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800 capitalize">{view}</h2>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
              />
              <select className="px-2 py-1 border rounded-lg text-sm">
                <option>Mejor match</option>
                <option>Más antiguos</option>
                <option>Más recientes</option>
              </select>
            </div>
          </div>

          <ul className="divide-y text-sm">
            <li className="flex justify-between items-center font-semibold px-4 py-3 bg-gray-50 sticky top-0 z-10">
              <span>Nombre</span>
              <span className="text-right">Heimdall</span>
            </li>

            {heimdallCandidates.map((candidate, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold text-xs">
                    {candidate.initials}
                  </div>
                  <span className="truncate max-w-[120px]">{candidate.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      candidate.status === "APLICA"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {candidate.status}
                  </span>
                  <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </li>
            ))}
          </ul>

          <div className="p-4 border-t text-sm flex justify-between items-center">
            <span>Página 1 de 548</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 border rounded text-gray-400" disabled>
                Anterior
              </button>
              <button className="px-2 py-1 border rounded hover:bg-gray-100">
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}

      {view === "process-stages" && (
        <>
          <div className="p-4 border-b flex items-center justify-between">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-sm font-medium text-gray-700">
              2.01 Vinculados sin acciones
            </h2>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 p-4">
            {processStageCandidates.map((c, idx) => (
              <div
                key={idx}
                className={`rounded-xl border px-4 py-3 text-sm shadow-sm ${
                  c.selected
                    ? "bg-purple-50 border-purple-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold text-xs">
                    {c.initials}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
