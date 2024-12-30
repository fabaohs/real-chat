import { SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <SidebarHeader title="Conversas" />
      <div>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
