import { Navbar } from "@/components/admin-panel/navbar";

interface SateliteLayoutProps {
  title: string;
  view: string;
  indice: string;
  children: React.ReactNode;
}

export function SateliteLayout({ title, view, children, indice }: SateliteLayoutProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar title={title} view={view} indice={indice} />
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}
