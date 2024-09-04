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
  submenus: any;
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
          href: "",
          label: "Satélite",
          active: pathname.includes("/satelite"),
          icon: Satellite,
          submenus: [
            {
              href: "",
              label: "GOES16",
              active: pathname.includes("/satelite"),
              submenus: [
                {
                  href: "/satelite/CP",
                  label: "CP",
                  active: pathname === "/satelite/CP"
                },
                {
                  href: "/satelite/KI",
                  label: "KI",
                  active: pathname === "/satelite/KI"
                },
                {
                  href: "/satelite/LI",
                  label: "LI",
                  active: pathname === "/satelite/LI"
                },
                {
                  href: "/satelite/TT",
                  label: "TT",
                  active: pathname === "/satelite/TT"
                },
                {
                  href: "/satelite/SI",
                  label: "SI",
                  active: pathname === "/satelite/SI"
                },
              
              ]
            }
          ]
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
              active: pathname === "/chuva",
              submenus: []
            }
          ]
        }
      ]
    }
  ];
}
