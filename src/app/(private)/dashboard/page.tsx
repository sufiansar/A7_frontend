import { AppSidebar } from "@/components/modules/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-gray-900">
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-gray-900">
          <div className="@container/main flex flex-1 flex-col gap-2 bg-gray-900">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-gray-900">
              <div className="px-4 lg:px-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome to Portfolio Dashboard
                </h1>
                <p className="text-gray-400">
                  Manage your projects, skills, and portfolio content from here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
