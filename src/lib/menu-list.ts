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
          active: pathname.includes("/satelite/goes16"),
          icon: Satellite,
          submenus: [
            {
              href: "",
              label: "GOES16",
              active: pathname.includes("/satelite/goes16"),
              submenus: [
                {
                  href: "/satelite/goes16/CP",
                  label: "CP",
                  active: pathname === "/satelite/goes16/CP"
                },
                {
                  href: "/satelite/goes16/KI",
                  label: "KI",
                  active: pathname === "/satelite/goes16/KI"
                },
                {
                  href: "/satelite/goes16/LI",
                  label: "LI",
                  active: pathname === "/satelite/goes16/LI"
                },
                {
                  href: "/satelite/goes16/TT",
                  label: "TT",
                  active: pathname === "/satelite/goes16/TT"
                },
                {
                  href: "/satelite/goes16/SI",
                  label: "SI",
                  active: pathname === "/satelite/goes16/SI"
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
              active: pathname.includes("/radar/mendanha"),
              submenus: [
                {
                  href: "/radar/mendanha/refletividade-horizontal",
                  label: "Refletividade Horizontal",
                  active: pathname === "/radar/mendanha/refletividade-horizontal"
                },
                {
                  href: "/radar/mendanha/estimativa-de-chuva-atual-impa",
                  label: "Estimativa de Chuva Atual (IMPA)",
                  active: pathname === "/radar/mendanha/estimativa-de-chuva-atual-impa"
                },
              ]
            }
          ]
        },
        {
          href: "",
          label: "Pluviômetros",
          active: pathname.includes("/pluviometros"),
          icon: BarChartBigIcon,
          submenus: [
            {
              href: "",
              label: "AlertaRio",
              active: pathname.includes("/pluviometros/alertario"),
              submenus: [
                {
                  href: "/pluviometros/alertario/estimativa-de-chuva-atual",
                  label: "Estimativa de Chuva Atual",
                  active: pathname === "/pluviometros/alertario/estimativa-de-chuva-atual"
                }
              ]
            }
          ]
        },
        {
          href: "",
          label: "Previsão de Chuva",
          active: pathname.includes("/previsao-de-chuva"),
          icon: CloudRainWind,
          submenus: [
            {
              href: "/previsao-de-chuva/1h2h3h/",
              label: "1h, 2h, 3h",
              active: pathname === "/previsao-de-chuva/1h2h3h/",
              submenus: [
                {
                  href: "/previsao-de-chuva/1h2h3h/satelite-rio-now-cast",
                  label: "Satélite (RioNowCast)",
                  active: pathname === "/previsao-de-chuva/1h2h3h/satelite-rio-now-cast"
                },
                {
                  href: "/previsao-de-chuva/1h2h3h/pluv-est-met-radar-rio-now-cast",
                  label: "Estimativa de Chuva Atual",
                  active: pathname === "/previsao-de-chuva/1h2h3h/pluv-est-met-radar-rio-now-cast"
                }
              ]
            },
            {
              href: "/previsao-de-chuva",
              label: "xy, yh, zh",
              active: pathname === "/previsao-de-chuva",
              submenus: [
                {
                  href: "/previsao-de-chuva/xyyhzh/IMPA",
                  label: "IMPA",
                  active: pathname === "/previsao-de-chuva/xyyhzh/IMPA"
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
