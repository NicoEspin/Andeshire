"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  LineChart,
  Share2,
  Briefcase,
  Users,
  Building,
  ClipboardList,
  Linkedin,
  Megaphone,
  Menu,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl"; // ✅ Importa useTranslations

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
        ${isActive ? "bg-blue-200 text-white" : ""}`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSideBarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col 
    ${isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"}
    bg-white transition-all duration-500 overflow-hidden h-full
    shadow-md z-40`;

  const t = useTranslations("Sidebar"); // ✅ Instancia de traducciones

  return (
    <aside className={sidebarClassNames}>
      {/* Logo */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1
          className={`${
            isSideBarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          Andeshire
        </h1>
        <button
          className="md:hidden mr-1 px-3 py-3 bg-gray-100 rounded-full
            hover:bg-blue-100 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={LineChart}
          label={t("Dashboard")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/workflow"
          icon={Share2}
          label={t("Workflow")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/jobs"
          icon={Briefcase}
          label={t("Trabajos")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/candidates"
          icon={Users}
          label={t("Candidatos")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/companies"
          icon={Building}
          label={t("Compañías")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/forms"
          icon={ClipboardList}
          label={t("Formularios")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/templates"
          icon={LayoutTemplate}
          label={t("Templates")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/linkedin"
          icon={Linkedin}
          label={t("Linkedin")}
          isCollapsed={isSideBarCollapsed}
        />
        <SidebarLink
          href="/campaigns"
          icon={Megaphone}
          label={t("Campañas")}
          isCollapsed={isSideBarCollapsed}
        />
      </div>

      {/* Footer */}
      <footer>
        <p className="text-center text-xs text-gray-500">
          &copy; 2025 Andeshire
        </p>
      </footer>
    </aside>
  );
};

export default Sidebar;
