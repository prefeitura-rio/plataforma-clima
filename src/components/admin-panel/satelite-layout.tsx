import { Navbar } from "@/components/admin-panel/navbar";

interface SateliteLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function SateliteLayout({ title, children }: SateliteLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar title={title} />
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}
