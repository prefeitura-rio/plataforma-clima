import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { Sidebar } from "./sidebar";

interface NavbarProps {
  title: string;
  view: string;
  indice: string;
}

export function Navbar({ title, view, indice }: NavbarProps) {
  return (
    <>

      <SheetMenu view={view} indice={indice} />
      <Sidebar view={view} indice={indice} />

    </>
  );
}
