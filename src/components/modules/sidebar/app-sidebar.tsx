"use client";

import * as React from "react";
import {
  IconDashboard,
  IconBriefcase,
  IconCode,
  IconUser,
  IconArticle,
  IconPlus,
  IconEye,
  IconLogout,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Portfolio Admin",
    email: "admin@portfolio.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: IconBriefcase,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
        {
          title: "Create Project",
          url: "/dashboard/projects/create",
        },
      ],
    },
    {
      title: "Skills",
      url: "/dashboard/skills",
      icon: IconCode,
      items: [
        {
          title: "All Skills",
          url: "/dashboard/skills",
        },
        {
          title: "Add Skill",
          url: "/dashboard/skills/create",
        },
      ],
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: IconArticle,
      items: [
        {
          title: "All Blogs",
          url: "/dashboard/blogs",
        },
        {
          title: "Create Blog",
          url: "/dashboard/blogs/create",
        },
      ],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: IconUser,
    },
  ],
  quickActions: [
    {
      title: "New Project",
      url: "/dashboard/projects/create",
      icon: IconPlus,
    },
    {
      title: "New Skill",
      url: "/dashboard/skills/create",
      icon: IconPlus,
    },
    {
      title: "New Blog",
      url: "/dashboard/blogs/create",
      icon: IconPlus,
    },
    {
      title: "View Portfolio",
      url: "/",
      icon: IconEye,
    },
  ],
  navSecondary: [
    {
      title: "Logout",
      url: "/api/auth/signout",
      icon: IconLogout,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" className="dark" {...props}>
      <SidebarHeader className="bg-gray-900 border-b border-gray-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-gray-800"
            >
              <a href="/dashboard" className="text-white">
                <IconUser className="!size-5 text-blue-400" />
                <span className="text-base font-semibold text-white">
                  Portfolio Admin
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <div className="text-gray-300">
          <NavMain items={data.navMain} />
        </div>
        <div className="px-3 py-2">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Quick Actions
          </h4>
          <div className="space-y-1">
            {data.quickActions.map((item) => (
              <SidebarMenuButton key={item.title} asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md px-2 py-1.5"
                >
                  <item.icon className="size-4 text-blue-400" />
                  {item.title}
                </a>
              </SidebarMenuButton>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <NavSecondary items={data.navSecondary} className="text-gray-300" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
