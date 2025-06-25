"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const mockNotifications = {
  count: 1049,
  notifications: [
    {
      id: "174d5fe5-dd54-4de9-8332-a2bb9c9c4f2a",
      message: "Hay una nueva postulación para Fullstack Developer Trainee",
      is_read: false,
      action_url:
        "/ats/jobs/c53c6e45-df5d-48f0-8d2e-fef426527de0/?section=applicants",
      created_at: "2025-06-18T16:01:26.972253+00:00",
    },
    {
      id: "541e83a3-6845-468e-b65a-eb50ca81533b",
      message: "Hay una nueva postulación para Fullstack Developer Trainee",
      is_read: false,
      action_url:
        "/ats/jobs/c53c6e45-df5d-48f0-8d2e-fef426527de0/?section=applicants",
      created_at: "2025-06-18T15:56:22.538794+00:00",
    },
    
  ],
};

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-blue-100 transition-colors"
      >
        <Bell className="text-gray-600" size={22} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
          {mockNotifications.notifications.length}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              absolute z-10 mt-2 bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden
              right-0 sm:w-80 w-[calc(100vw-2rem)]
            `}
          >
            <div className="p-4 border-b border-gray-300 text-sm font-semibold text-gray-800">
              Notificaciones
            </div>
            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
              {mockNotifications.notifications.map((n) => (
                <li
                  key={n.id}
                  className={`transition-colors ${
                    n.is_read ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <Link
                    href={n.action_url}
                    className="block px-4 py-3 text-sm text-gray-800"
                  >
                    <div className="font-medium">{n.message}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(n.created_at).toLocaleString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center py-3 text-sm text-blue-600 hover:underline cursor-pointer border-t border-gray-300">
              Ver todas
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
