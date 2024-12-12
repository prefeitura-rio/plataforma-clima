import { Navbar } from "@/components/admin-panel/navbar";

interface RadarLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function RadarLayout({ title, children }: RadarLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar title={title} />
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}
