import Link from "next/link";
import { ChevronRight } from 'lucide-react';

import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";

interface SheetMenuProps {
  view?: string;
  indice?: string;
}

export function SheetMenu({ view, indice }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden fixed top-24 left-0 z-50">
        <div className="relative w-8 h-8">
          <div className="absolute top-0 left-0 w-8 h-8 bg-gray-800 rounded-r-full"></div>
          <ChevronRight className="absolute top-1/2 left-1.5 -translate-y-1/2 text-white" size={24} />
        </div>
      </SheetTrigger>
      <SheetContent className="sm:w-72 pl-0 pr-1 h-full flex flex-col" side="left">
        <SheetHeader>
          <Link href="/previsao-de-chuva/v1/mapa" className="flex items-center gap-2 pb-2 pt-1">
            <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Weather Icon" className="w-6 h-6 mr-1" />
            <SheetTitle className="font-bold text-lg">Plataforma Clima</SheetTitle>
          </Link>
        </SheetHeader>
        <Menu isOpen view={view} indice={indice} />
      </SheetContent>
    </Sheet>
  );
}

