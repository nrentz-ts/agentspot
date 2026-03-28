import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/lib/sidebar-context";
import { ThemeProvider } from "@/lib/theme-context";
import { VariantProvider } from "@/lib/variant-context";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <VariantProvider>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-background">{children}</main>
          </div>
        </SidebarProvider>
      </VariantProvider>
    </ThemeProvider>
  );
}
