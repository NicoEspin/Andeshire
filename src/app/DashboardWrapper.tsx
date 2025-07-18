"use client";

import ModalManager from "@/app/components/ModalManager";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import StagingTest from "@/app/components/StagingTest";
import { usePathname } from "next/navigation";
import React from "react";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const pathname = usePathname();

  // Rutas que no deben mostrar el layout completo
  const excludedRoutes = ["/login"];

  // Verificar si la ruta actual debe ser excluida
  const shouldExcludeLayout = excludedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Si la ruta debe ser excluida, renderizar solo los children
  if (shouldExcludeLayout) {
    return (
      <div className="w-full min-h-screen">
        {children}
        <ModalManager />
        <StagingTest />
      </div>
    );
  }

  // Layout normal para todas las demás rutas
  return (
    <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
      <Sidebar />
      <main
        className={`min-h-screen flex flex-col w-full pt-7  
       ${isSideBarCollapsed ? "md:pl-24" : "md:pl-72"} `}
      >
        <Navbar />
        {children}
      </main>
      <ModalManager />
      <StagingTest />
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
