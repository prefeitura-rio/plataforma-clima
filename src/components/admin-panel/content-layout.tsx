import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  view?: string;
  indice?: string;
  children: React.ReactNode;
}


export function ContentLayout({ title, view, children, indice }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} view={view} indice={indice} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
