"use client";

import {
  Blocks,
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Mic,
  Settings2,
  Trash2,
} from "lucide-react";
import * as React from "react";

import { NavFavorites } from "@/components/Layout/nav-favorites";
import { NavMain } from "@/components/Layout/nav-main";
import { NavSecondary } from "@/components/Layout/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// This is sample data.
const data = {
  navMain: [
    // {
    //   title: "Ask AI",
    //   url: "/app/ask-ai",
    //   icon: Sparkles,
    // },
    {
      title: "Home",
      url: "/app",
      icon: Home,
    },
    {
      title: "Editor",
      url: "/app/editor",
      icon: Inbox,
    },
    {
      title: "Record",
      url: "/app/record",
      icon: Mic,
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 font-black text-2xl">
          Rewrite
          <span className="text-gray-700 font-bold">AI</span>
        </h1>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
