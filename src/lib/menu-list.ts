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
          href: "/previsao-de-chuva/v1/mapa",
          label: "Modelo de Previsão ConvLSTM (em teste)",
          active: pathname.includes("/previsao-de-chuva/v1"),
          icon: CloudRainWind,
          submenus: [
            // {
            //   href: "/previsao-de-chuva/v1/",
            //   label: "v1 (RioNowcast)",
            //   active: pathname.includes("/previsao-de-chuva/v1"),
            //   submenus: [
            //   ]
            // },
          
          ]
        },
        {
          href: "/radar/mendanha/reflectivity/mapa",
          label: "Radar",
          active: pathname.includes("/radar/mendanha/reflectivity"),
          icon: Radar,
          submenus: [
            // {
            //   href: "",
            //   label: "Mendanha",
            //   active: pathname.includes("/radar/mendanha"),
            //   submenus: [
            //     {
            //       href: "/radar/mendanha/reflectivity",
            //       label: "Refletividade Horizontal",
            //       active: pathname.includes("/radar/mendanha/reflectivity")
            //     },
            //   ]
            // }
          ]
        },
        {
          href: "",
          label: "Satélite",
          active: pathname.includes("/satelite/"),
          icon: Satellite,
          submenus: [
         
                {
                  href: "/satelite/CP",
                  label: "CAPE - Energia Potencial",
                  active: pathname.includes("/satelite/CP"),
                  submenus: []
                },
                {
                  href: "/satelite/KI",
                  label: "KI - Índice K",
                  active: pathname.includes("/satelite/KI"),
                  submenus: []
                },
                {
                  href: "/satelite/LI",
                  label: "LI - Índice de Levantamento ",
                  active: pathname.includes("/satelite/LI"),
                  submenus: []
                },
                {
                  href: "/satelite/RRQPE",
                  label: "RRQPE - Precipitação",
                  active: pathname.includes("/satelite/RRQPE"),
                  submenus: []
                },
                {
                  href: "/satelite/SI",
                  label: "SI - Showalter",
                  active: pathname.includes("/satelite/SI"),
                  submenus: []
                },
                {
                  href: "/satelite/SST",
                  label: "SST - Temperatura da Água do Mar",
                  active: pathname.includes("/satelite/SST"),
                  submenus: []
                },
                {
                  href: "/satelite/TPW",
                  label: "TPW - Água Precipitável",
                  active: pathname.includes("/satelite/TPW"),
                  submenus: []
                },  
                {
                  href: "/satelite/TT",
                  label: "TT - Índice Total-Totals",
                  active: pathname.includes("/satelite/TT"),
                  submenus: []
                },        
          ]
        },
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
       
      ]
    }
  ];
}
