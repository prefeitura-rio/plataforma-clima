import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import { MapStyleProvider } from "@/context/MapStyleContext";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <MapStyleProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <Toaster />
    </MapStyleProvider>
  );
}