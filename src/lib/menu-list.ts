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
    // {
    //   groupLabel: "",
    //   menus: [
    //     {
    //       href: "/dashboard",
    //       label: "Dashboard",
    //       active: pathname.includes("/dashboard"),
    //       icon: LayoutGrid,
    //       submenus: []
    //     }
    //   ]
    // },
    {
      groupLabel: "Produtos",
      menus: [
        {
          href: "",
          label: "Satélite",
          active: pathname.includes("/satelite/"),
          icon: Satellite,
          submenus: [
         
                {
                  href: "/satelite/CP",
                  label: "CP",
                  active: pathname.includes("/satelite/CP"),
                  submenus: []
                },
                {
                  href: "/satelite/KI",
                  label: "KI",
                  active: pathname.includes("/satelite/KI"),
                  submenus: []
                },
                {
                  href: "/satelite/LI",
                  label: "LI",
                  active: pathname.includes("/satelite/LI"),
                  submenus: []
                },
                {
                  href: "/satelite/TT",
                  label: "TT",
                  active: pathname.includes("/satelite/TT"),
                  submenus: []
                },
                {
                  href: "/satelite/SI",
                  label: "SI",
                  active: pathname.includes("/satelite/SI"),
                  submenus: []
                },
              
             
          ]
        },
        // {
        //   href: "",
        //   label: "Radar",
        //   active: pathname.includes("/radar"),
        //   icon: Radar,
        //   submenus: [
        //     {
        //       href: "",
        //       label: "Mendanha",
        //       active: pathname.includes("/radar/mendanha"),
        //       submenus: [
        //         {
        //           href: "/radar/mendanha/refletividade-horizontal",
        //           label: "Refletividade Horizontal",
        //           active: pathname === "/radar/mendanha/refletividade-horizontal"
        //         },
        //         {
        //           href: "/radar/mendanha/estimativa-de-chuva-atual-impa",
        //           label: "Estimativa de Chuva Atual (IMPA)",
        //           active: pathname === "/radar/mendanha/estimativa-de-chuva-atual-impa"
        //         },
        //       ]
        //     }
        //   ]
        // },
        // {
        //   href: "",
        //   label: "Pluviômetros",
        //   active: pathname.includes("/pluviometros"),
        //   icon: BarChartBigIcon,
        //   submenus: [
        //     {
        //       href: "",
        //       label: "AlertaRio",
        //       active: pathname.includes("/pluviometros/alertario"),
        //       submenus: [
        //         {
        //           href: "/pluviometros/alertario/estimativa-de-chuva-atual",
        //           label: "Estimativa de Chuva Atual",
        //           active: pathname === "/pluviometros/alertario/estimativa-de-chuva-atual"
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          href: "",
          label: "Previsão de Chuva",
          active: pathname.includes("/previsao-de-chuva"),
          icon: CloudRainWind,
          submenus: [
            {
              href: "/previsao-de-chuva/1h2h3h/",
              label: "1h, 2h, 3h",
              active: pathname.includes("/previsao-de-chuva/1h2h3h"),
              submenus: [
                {
                  href: "/previsao-de-chuva/1h2h3h/satelite-rio-now-cast",
                  label: "v1 (RioNowcast)",
                  active: pathname === "/previsao-de-chuva/1h2h3h/satelite-rio-now-cast"
                },
                // {
                //   href: "/previsao-de-chuva/1h2h3h/pluv-est-met-radar-rio-now-cast",
                //   label: "Estimativa de Chuva Atual",
                //   active: pathname === "/previsao-de-chuva/1h2h3h/pluv-est-met-radar-rio-now-cast"
                // }
              ]
            },
            {
              href: "/previsao-de-chuva/3h",
              label: "3h",
              active: pathname === "/previsao-de-chuva/3h",
              submenus: [
                {
                  href: "/previsao-de-chuva/3h/NowcastNet",
                  label: "NowcastNet (IMPA)",
                  active: pathname === "/previsao-de-chuva/3h/NowcastNet"
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
