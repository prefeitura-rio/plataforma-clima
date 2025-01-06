'use client'

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";

const mockData = [
  {
    imageLight: "/LNCC_logo_light.png",
    imageDark: "/LNCC_logo_dark.png",
    description: "O Laboratório Nacional de Computação Científica (LNCC) é uma instituição de pesquisa e desenvolvimento tecnológico do Ministério da Ciência, Tecnologia e Inovação (MCTI), especializada em computação científica. Suas linhas de pesquisa incluem bioinformática, modelagem ambiental, ciência multiescala e mecânica dos fluidos computacional, com aplicações em áreas como otimização de estruturas e simulação de reservatórios de petróleo."
  },
  {
    imageLight: "/cefet_logo_light.png",
    imageDark: "/cefet_logo_dark.png",
    description: "O Centro Federal de Educação Tecnológica Celso Suckow da Fonseca (CEFET/RJ) é uma instituição federal vinculada ao Ministério da Educação que oferece ensino médio, técnico e superior de excelência, especialmente reconhecido por empresas e indústrias. O CEFET/RJ também conta com o canal online TV Cefet/RJ."
  },
  {
    imageLight: "/RNC_logo_light.png",
    imageDark: "/RNC_logo_dark.png",
    description: "O Rionowcast é um consórcio formado pelo LNCC, CEFET-RJ, UFF, Escritório de Dados e o Centro de Operações Rio (COR), dedicado a pesquisas em inteligência artificial e gerenciamento de dados para previsão de chuvas extremas no Rio de Janeiro. Diante do aumento de eventos extremos, o projeto desenvolve modelos baseados em IA para mitigar os impactos urbanos, como enchentes, deslizamentos e congestionamentos, reunindo pesquisadores, estudantes e profissionais para enfrentar esses desafios."
  },
  {
    imageLight: "/IMPA_logo_light.png",
    imageDark: "",
    description: "O Instituto de Matemática Pura e Aplicada (IMPA) é uma instituição de excelência em pesquisa, ensino e difusão do conhecimento em matemática. Vinculado ao Ministério da Ciência, Tecnologia e Inovação (MCTI) e ao Ministério da Educação (MEC), o IMPA é reconhecido internacionalmente como um dos principais centros de matemática do mundo. Com sede no Rio de Janeiro, oferece programas de pós-graduação incluindo mestrado, doutorado e pós-doutorado."
  },
  {
    imageLight: "/alerta_rio_light.png",
    imageDark: "",
    description: "O Alerta Rio é o sistema de alerta para chuvas fortes e deslizamentos em encostas na cidade do Rio de Janeiro. Ele é gerido pela Fundação GEO-RIO e emite boletins de alerta sempre que há previsão de chuvas intensas que possam causar alagamentos e/ou deslizamentos. Conta com 33 estações de telemetria em tempo real, sendo 26 pluviométricas, 5 meteorológicas que medem chuva, temperatura e umidade, e 2 completas que também medem vento e pressão atmosférica."
  },
  {
    imageLight: "/cor_logo_light.png",
    imageDark: "",
    description: "Inaugurado em 2010, o Centro de Operações Rio (COR) é pioneiro na América Latina e integra ações públicas para minimizar os impactos de incidentes. Com 2.500 câmeras, 500 profissionais e alta tecnologia, o COR monitora a cidade 24h, registrando cerca de 1.200 ocorrências por mês e antecipando soluções em situações de crise. Desde sua criação, o COR se tornou um marco para o Rio, reduzindo surpresas causadas por chuvas e outros eventos, alertando órgãos responsáveis e a população sobre riscos e medidas emergenciais."
  },
  {
    imageLight: "/uff_logo_light.png",
    imageDark: "",
    description: "A Universidade Federal Fluminense (UFF) tem sua sede em Niterói e unidades em diversos municípios do estado do Rio de Janeiro. Oferece cursos de graduação presenciais e a distância, além de programas de pós-graduação stricto sensu e de especialização. A UFF é referência em ensino, pesquisa e extensão, integrando a rotina de seus campi e comunidades locais em regiões como Angra dos Reis, Petrópolis, Volta Redonda, entre outras."
  },
  {
    imageLight: "/dexl_logo_light.png",
    imageDark: "",
    description: "O Data Extreme Lab (DEXL) é um grupo de pesquisa do Laboratório Nacional de Computação Científica (LNCC), focado em ciência de dados, inteligência artificial e big data. Aplicamos técnicas da ciência da computação para resolver problemas em áreas como astronomia, biodiversidade, petróleo e gás, cidades inteligentes, entre outras."
  },
];

export default function SobreContent() {
  const { theme } = useTheme();
  return (
    <Card className="rounded-lg border-none">
      <CardContent className="mt-3 p-6">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sobre</h2>
          <p className="text-base">
            Em um esforço conjunto para aprimorar a previsão de eventos climáticos, a Prefeitura do Rio de Janeiro está lançando a Plataforma Clima, uma nova ferramenta voltada para os meteorologistas acompanharem a evolução de chuvas e condições atmosféricas em tempo real. Esta plataforma combina dados de satélites, radares e estações meteorológicas com modelos avançados de nowcasting (previsão em curto prazo) movidos por inteligência artificial, possibilitando um monitoramento preciso e atualizado dos fenômenos meteorológicos.<br /><br />
            A Plataforma Clima é fruto de uma parceria estratégica entre organizações governamentais e centros de pesquisa de ponta do Rio de Janeiro, reunindo uma ampla rede de especialistas para enfrentar os desafios da previsão meteorológica. Entre os parceiros deste projeto estão o grupo RioNowcast — uma aliança composta por pesquisadores do LNCC (Laboratório Nacional de Computação Científica), CEFET/RJ, UFF e DEXL —, o Centro Pi do IMPA, além de órgãos fundamentais como o COR, o Alertario e o INEA, e o Escritório de Dados.<br /><br />
            A criação da Plataforma Clima marca um novo patamar no monitoramento climático e na colaboração entre centros de pesquisa e órgãos governamentais no Brasil. Com o suporte de tecnologias de inteligência artificial e a expertise de instituições renomadas, a plataforma surge como uma ferramenta indispensável para meteorologistas e gestores de risco, capacitando-os a tomar decisões informadas e em tempo hábil.

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