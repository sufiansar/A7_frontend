"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-gray-800 data-[active=true]:text-white"
              >
                <a href={item.url} className="flex items-center gap-2">
                  {item.icon && <item.icon className="text-blue-400" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items && item.items.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuButton
                      key={subItem.title}
                      asChild
                      className="text-gray-400 hover:text-gray-200 hover:bg-gray-800 text-sm"
                    >
                      <a
                        href={subItem.url}
                        className="flex items-center gap-2 py-1"
                      >
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        {subItem.title}
                      </a>
                    </SidebarMenuButton>
                  ))}
                </div>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
