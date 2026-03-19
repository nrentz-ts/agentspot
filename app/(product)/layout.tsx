import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/lib/sidebar-context";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white">{children}</main>
      </div>
    </SidebarProvider>
  );
}
