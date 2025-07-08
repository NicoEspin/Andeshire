"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state/index";
import { Menu, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import { Switch } from "@/components/ui/switch";
import { setLocale } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const locale = useAppSelector((state) => state.global.locale);
 const handleChange = (checked: boolean) => {
  const newLocale = checked ? "en" : "es";
  dispatch(setLocale(newLocale));

  // ✅ Guarda en cookie
  document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

  // ✅ O añade query param para forzar re-hidratación sin cambiar pathname
  const url = new URL(window.location.href);
  url.searchParams.set("locale", newLocale);
  window.history.replaceState({}, "", url.toString());

  // ✅ Forzar reload para SSR
  location.reload();
};


  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSideBarCollapsed));
  };

  return (
    <nav className=" flex justify-between items-center w-full mb-7 md:pr-24">
      {/* Left Side */}

      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{locale === "en" ? "EN" : "ES"}</span>
          <Switch checked={locale === "en"} onCheckedChange={handleChange} />
        </div>
        <div className="flex md:justify-between items-center gap-5">
          <NotificationDropdown />
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9"></div>
            <span className="font-semibold">Nicolás Espin</span>
          </div>
        </div>
        <Link
          href="/settings"
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
        >
          <Settings className="cursor-pointer " size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
