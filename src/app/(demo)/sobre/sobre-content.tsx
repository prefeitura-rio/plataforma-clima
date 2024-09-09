'use client'

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";

const mockData = [
  {
    imageLight: "/LNCC_logo_light.png",
    imageDark: "/LNCC_logo_dark.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/cefet_logo_light.png",
    imageDark: "/cefet_logo_dark.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/RNC_logo_light.png",
    imageDark: "/RNC_logo_dark.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/IMPA_logo_light.png",
    imageDark: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/alerta_rio_light.png",
    imageDark: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/cor_logo_light.png",
    imageDark: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/uff_logo_light.png",
    imageDark: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    imageLight: "/dexl_logo_light.png",
    imageDark: "",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
];

export default function SobreContent() {
  const { theme } = useTheme();
  return (
    <Card className="rounded-lg border-none">
      <CardContent className="p-6">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sobre</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <h2 className="text-xl font-semibold mb-4">Parceiros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {mockData.map((item, index) => (
            <div key={index} className="card">
              <div className="relative w-full h-48">
                <Image
                  src={theme === "dark" || !item.imageDark ? item.imageLight : item.imageDark}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="mt-2 text-center">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          Desenvolvido por Escritório de Dados da Cidade do Rio de Janeiro <span className="align-top text-xs">®</span>
        </div>
      </CardContent>
    </Card>
  );
}