"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Dot, LucideIcon, LineChart, Map } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  submenus: any;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
  labelBold?: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
  indice?: string;
  setIndice: (value: string) => void;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
  labelBold = true,
  activeTab,
  setActiveTab,
  indice,
  setIndice
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  const pathname = usePathname();

  const getUpdatedUrl = (tab: string) => {
    const baseUrl = pathname.split('/').slice(0, -1).join('/');
    return `${baseUrl}/${tab === 'tab1' ? 'mapa' : 'grafico'}`;
  };

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className="w-full justify-start h-10"
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className={cn("mr-3", (label !== "Satélite" && label !== "Radar" && label !== "Pluviômetros" && label !== "Previsão de Chuva") && "mr-2 ml-6")}>
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                  isCollapsed && "font-bold"
                )}
              >
                {label}
              </p>

              {label === "Satélite" && (
                <div className="sm:ml-5 ml-2">
                  <Tabs className="w-[44px]" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                    <TabsList>
                      <TabsTrigger value="tab1" asChild>
                        <Link href={getUpdatedUrl('tab1')}>
                          <Map className="w-4 h-4" />
                        </Link>
                      </TabsTrigger>
                      <TabsTrigger value="tab2" asChild>
                        <Link href={getUpdatedUrl('tab2')}>
                          <LineChart className="w-4 h-4" />
                        </Link>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}

            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0"
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active, submenus: nestedSubmenus }, index) => (
          nestedSubmenus?.length > 0 ? (
            <CollapseMenuButton
              key={index}
              labelBold={false}
              icon={Dot}
              label={label}
              active={active}
              submenus={nestedSubmenus}
              isOpen={isOpen}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              indice={indice}
              setIndice={setIndice}
            />
          ) : (
            <Button
              key={index}
              variant={active ? "secondary" : "ghost"}
              className="w-full justify-start h-10 mb-1"
              asChild
            >
              <Link href={activeTab === "tab1" ? `${href}/mapa` : `${href}/grafico`} onClick={() => setIndice(href)}>
                <span className={cn("mr-3 ml-10", (label === "CP" || label === "KI" || label === "LI" || label === "TT" || label === "SI" || label === "RRQPE" || label === "SST" || label === "TPW") && "mr-2 ml-6")}>
                  {/* <Dot size={18} /> */}
                </span>
                <p className="max-w-[170px] truncate">{label}</p>
              </Link>
            </Button>
          )
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}>
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {submenus.map(({ href, label, submenus: nestedSubmenus }, index) => (
          nestedSubmenus?.length > 0 ? (
            <DropdownMenuItem key={index} asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start h-10">
                    <p className="max-w-[180px] truncate">{label}</p>
                    <ChevronDown size={16} className="ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={10} align="start">
                  {nestedSubmenus.map(({ href, label }: any, nestedIndex: any) => (
                    <DropdownMenuItem key={nestedIndex} asChild>
                      <Link className="cursor-pointer" href={href}>
                        <p className="max-w-[160px] truncate">{label}</p>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem key={index} asChild>
              <Link className="cursor-pointer" href={href}>
                <p className="max-w-[180px] truncate">{label}</p>
              </Link>
            </DropdownMenuItem>
          )
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}