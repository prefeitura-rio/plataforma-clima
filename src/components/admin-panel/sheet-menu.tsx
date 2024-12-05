import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

interface SheetMenuProps {
  view?: string;
  indice?: string;
}

export function SheetMenu({ view, indice }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden fixed top-2 left-4 z-50" >
        <Button className="rounded-md w-7 h-7"
          variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Weather Icon" className="w-6 h-6 mr-1" />
              <SheetTitle className="font-bold text-lg">Plataforma Clima</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen view={view} indice={indice} />
      </SheetContent>
    </Sheet>
  );
}