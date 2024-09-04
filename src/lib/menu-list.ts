import {
  Satellite,
  Radar,
  CloudRainWind,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Produtos",
      menus: [
        {
          href: "/satelite/CP",
          label: "Satélite",
          active: pathname.includes("/satelite/CP"),
          icon: Satellite,
          submenus: []
        },
        {
          href: "/radar",
          label: "Radar",
          active: pathname.includes("/radar"),
          icon: Radar,
          submenus: []
        },
        {
          href: "",
          label: "Chuva",
          active: pathname.includes("/chuva"),
          icon: CloudRainWind,
          submenus: [
            {
              href: "/chuva",
              label: "Chovendo agora",
              active: pathname === "/chuva"
            }
          ]
        }
      ]
    }
  ];
}
