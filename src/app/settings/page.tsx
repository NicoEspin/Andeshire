"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  Linkedin,
  Settings as SettingsIcon,
  Tags,
  Users,
  Import,
  ToggleRight,
  LogOut,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import AdvancedConfig from "./AdvancedConfig";

const mockData = {
  id: "8f14e45f-ea3d-4c9f-81c0-44b6b33e7c9b",
  user: {
    username: "recruiter_user",
    email: "recruiter_user@example.com",
  },
  name: "Mauricio",
  last_name: "Ramirez",
  email: "mauricio.ramirez@example.com",
  consulting_firm: {
    name: "RHVision",
  },
  is_admin: true,
  linkedin: "https://www.linkedin.com/in/mauricio-ramirez/",
};

export default function ConfigPage() {
  const t = useTranslations("Settings");

  const configItems = [
    {
      title: t("ConfigItems.WhatsApp"),
      icon: <WhatsAppIcon />,
      href: "/config/whatsapp",
      color: "from-green-400 to-green-600",
    },
    {
      title: t("ConfigItems.Calendar"),
      icon: <Calendar className="w-6 h-6" />,
      href: "/config/calendario",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      title: t("ConfigItems.Mail"),
      icon: <Mail className="w-6 h-6" />,
      href: "/config/mail",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: t("ConfigItems.LinkedIn"),
      icon: <Linkedin className="w-6 h-6" />,
      href: "/config/linkedin",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: t("ConfigItems.Tags"),
      icon: <Tags className="w-6 h-6" />,
      href: "/config/tags",
      color: "from-orange-400 to-orange-600",
    },
    {
      title: t("ConfigItems.Recruiters"),
      icon: <Users className="w-6 h-6" />,
      href: "/config/reclutadores",
      color: "from-lime-400 to-lime-600",
    },
    {
      title: t("ConfigItems.Twilio"),
      icon: <ToggleRight className="w-6 h-6" />,
      href: "/config/twilio",
      color: "from-rose-400 to-rose-600",
    },
    {
      title: t("ConfigItems.Import"),
      icon: <Import className="w-6 h-6" />,
      href: "/config/importar",
      color: "from-teal-400 to-teal-600",
    },
    {
      title: t("ConfigItems.CustomFields"),
      icon: <SettingsIcon className="w-6 h-6" />,
      href: "/config/campos-personalizados",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <main className="container mx-auto py-10 space-y-8">
      {/* Card del Header de usuario */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="w-16 h-16 ring-2 ring-purple-600 ">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${mockData.name}+${mockData.last_name}`}
                
              />
              <AvatarFallback >
                {mockData.name.charAt(0)}
                {mockData.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {mockData.name} {mockData.last_name}
              </h2>
              <p className="text-muted-foreground">{mockData.email}</p>
              <p className="text-sm text-muted-foreground">
                {mockData.consulting_firm.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Badge variant="outline">
              {mockData.is_admin
                ? t("Header.AdminBadge")
                : t("Header.UserBadge")}
            </Badge>
            {mockData.linkedin && (
              <Button asChild variant="ghost" size="sm">
                <a
                  href={mockData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> {t("Header.ProfileButton")}
                </a>
              </Button>
            )}
            <Button variant="destructive" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              {t("Header.Logout")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Card del Grid de configuraciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t("PanelTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {configItems.map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <Card className="relative overflow-hidden transition border border-muted hover:shadow-sm hover:scale-[1.02] rounded-xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 pointer-events-none`}
                  />
                  <CardHeader className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-background shadow-sm group-hover:shadow-md transition">
                      {item.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-lg font-medium group-hover:text-primary transition">
                      {item.title}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      <AdvancedConfig />
    </main>
  );
}
