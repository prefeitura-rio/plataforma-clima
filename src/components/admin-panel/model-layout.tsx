import { Navbar } from "@/components/admin-panel/navbar";

interface ModelLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ModelLayout({ title, children }: ModelLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar title={title} />
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}