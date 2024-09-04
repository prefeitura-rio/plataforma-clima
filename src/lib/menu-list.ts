import {
  Satellite,
  Radar,
  CloudRainWind,
  LayoutGrid,
  LucideIcon,
  BarChartBigIcon
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
          href: "",
          label: "Radar",
          active: pathname.includes("/radar"),
          icon: Radar,
          submenus: [
            {
              href: "",
              label: "Mendanha",
              active: pathname.includes("/radar"),
              submenus: [
                {
                  href: "/radar/refletividade-horizontal",
                  label: "Refletividade Horizontal",
                  active: pathname === "/radar/refletividade-horizontal"
                },
                {
                  href: "/radar/estimativa-de-chuva-atual-impa",
                  label: "Estimativa de Chuva Atual (IMPA)",
                  active: pathname === "/radar/estimativa-de-chuva-atual-impa"
                },
              ]
            }
          ]
        },
        {
          href: "",
          label: "Pluviômetros",
          active: pathname.includes("/pluviometro"),
          icon: BarChartBigIcon,
          submenus: [
            {
              href: "",
              label: "AlertaRio",
              active: pathname.includes("/pluviometro"),
              submenus: [
                {
                  href: "/pluviometro/estimativa-de-chuva-atual",
                  label: "Estimativa de Chuva Atual",
                  active: pathname === "/pluviometro/estimativa-de-chuva-atual"
                }
              ]
            }
          ]
        },
        {
          href: "",
          label: "Previsão de Chuva",
          active: pathname.includes("/chuva"),
          icon: CloudRainWind,
          submenus: [
            {
              href: "/chuva",
              label: "1h, 2h, 3h",
              active: pathname === "/chuva",
              submenus: [
                {
                  href: "/chuva/satelite/rio-now-cast",
                  label: "Satélite (RioNowCast)",
                  active: pathname === "/chuva/satelite/rio-now-cast"
                },
                {
                  href: "/chuva/pluv-est-met-radar/rio-now-cast",
                  label: "Estimativa de Chuva Atual",
                  active: pathname === "/chuva/pluv-est-met-radar/rio-now-cast"
                }
              ]
            },
            {
              href: "/chuva",
              label: "xy, yh, zh",
              active: pathname === "/chuva",
              submenus: [
                {
                  href: "/chuva/IMPA",
                  label: "IMPA",
                  active: pathname === "/chuva/IMPA"
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
