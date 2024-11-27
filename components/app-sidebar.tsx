"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUserData } from '@/hooks/useUserData';
import { Skeleton } from "@/components/ui/skeleton";

const navMainData = [
  {
    title: "Create",
    url: "#",
    icon: SquareTerminal,
    isActive: false,
  },
  {
    title: "Edit",
    url: "#",
    icon: Bot,
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
];

interface AppSidebarProps {
  className?: string
}

export function AppSidebar({ className }: AppSidebarProps) {
  const { profile, loading } = useUserData();

  const teamData = {
    name: "Our Name",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  };

  return (
    <div className="md:block">
      <Sidebar className={className} collapsible="icon">
        <SidebarHeader>
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <TeamSwitcher
              defaultValue={{
                name: teamData.name,
                logo: teamData.logo,
              }}
            />
          )}
        </SidebarHeader>
        <SidebarContent>
          {loading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <NavMain items={navMainData} />
          )}
        </SidebarContent>
        <SidebarFooter>
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : profile && (
            <NavUser
              user={{
                name: profile.username,
                email: profile.email,
                avatar: `/avatars/${profile.username}.jpg`,
              }}
            />
          )}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
