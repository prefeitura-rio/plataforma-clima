'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SatelliteLayer from "./satelite-map"
import { LineChartComponent } from "./ui/line-chart"
import ColorLabel from "./color-label"

interface SateliteContentProps {
  sateliteView: string;
}

const getRanges = (sateliteView: string) => {
  switch (sateliteView) {
    case "CP":
      return { valueRange: [0, 8000], stepRange: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000], name: "CAPE" };
    case "KI":
      return { valueRange: [0, 60], stepRange: [0, 10, 20, 30, 40, 50, 60], name: "K-index" };
    case "LI":
      return { valueRange: [-20, 20], stepRange: [-20, -15, -10, -5, 0, 5, 10, 15, 20], name: "Lifted Index" };
    case "TT":
      return { valueRange: [10, 70], stepRange: [10, 20, 30, 40, 50, 60, 70], name: "Total Totals Index" };
    case "SI":
      return { valueRange: [-20, 20], stepRange: [-20, -15, -10, -5, 0, 5, 10, 15, 20], name: " Showalter Index" };
    default:
      return { valueRange: [], stepRange: [], name: "" };
  }
}

export function TabsDemo({ sateliteView }: SateliteContentProps) {
  const { valueRange, stepRange, name } = getRanges(sateliteView);

  // Generate data with 15-minute intervals over the last 12 hours
  const generateData = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const remainder = minutes % 15;
    const adjustedNow = new Date(now.getTime() - remainder * 60 * 1000); // Ajusta para o próximo intervalo de 15 minutos completo
    const data = [];

    for (let i = 48; i >= 0; i--) { // 12 horas * 4 intervalos por hora = 48 intervalos
      const timestamp = new Date(adjustedNow.getTime() - i * 15 * 60 * 1000).toISOString();
      const value = Math.floor(Math.random() * 41) - 20; // Valor aleatório entre -20 e +20
      data.push({ timestamp, value });
    }

    return data;
  };

  const data = generateData();

  // Convert timestamp to extract only the local hour and minutes in "HH:MM" format
  const chartData = data.map(item => {
    const date = new Date(item.timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return {
      time: `${hours}:${minutes}`,
      value: item.value
    };
  });


  const productLabel_CP = [

    { color: 'rgb(255, 0, 0)', value: 0 },      // Vermelho
    { color: 'rgb(255, 0, 0)', value: 1000 },    // Vermelho
    { color: 'rgb(255, 0, 0)', value: 2000 },     // Vermelho
    { color: 'rgb(255, 127, 0)', value: 3000 },   // Laranja
    { color: 'rgb(255, 255, 0)', value: 4000 },   // Amarelo
    { color: 'rgb(0, 255, 0)', value: 5000 },     // Verde
    { color: 'rgb(0, 0, 255)', value: 6000 },     // Azul
    { color: 'rgb(75, 0, 130)', value: 7000 },    // Índigo
    { color: 'rgb(148, 0, 211)', value: 8000 },   // Violeta
  ];

  const productLabel_KI = [
    { color: 'rgb(255, 0, 0)', value: 0 },     // Vermelho
    { color: 'rgb(255, 127, 0)', value: 10 },   // Laranja
    { color: 'rgb(255, 255, 0)', value: 20 },   // Amarelo
    { color: 'rgb(0, 255, 0)', value: 30 },     // Verde
    { color: 'rgb(0, 0, 255)', value: 40 },     // Azul
    { color: 'rgb(75, 0, 130)', value: 50 },    // Índigo
    { color: 'rgb(148, 0, 211)', value: 60 },   // Violeta
  ];
  const productLabel_LI = [
    { color: 'rgb(255, 0, 0)', value: -20 },     // Vermelho
    { color: 'rgb(255, 127, 0)', value: -15 },   // Laranja
    { color: 'rgb(255, 255, 0)', value: -10 },   // Amarelo
    { color: 'rgb(0, 255, 0)', value: -5 },     // Verde
    { color: 'rgb(0, 0, 255)', value: 0 },     // Azul
    { color: 'rgb(75, 0, 130)', value: 5 },    // Índigo
    { color: 'rgb(148, 0, 211)', value: 10 },   // Violeta

  ];

  const productLabel_TT = [
    { color: 'rgb(255, 0, 0)', value: 10 },     // Vermelho
    { color: 'rgb(255, 127, 0)', value: 20 },   // Laranja
    { color: 'rgb(255, 255, 0)', value: 30 },   // Amarelo
    { color: 'rgb(0, 255, 0)', value: 40 },     // Verde
    { color: 'rgb(0, 0, 255)', value: 50 },     // Azul
    { color: 'rgb(75, 0, 130)', value: 60 },    // Índigo
    { color: 'rgb(148, 0, 211)', value: 70 },   // Violeta
  ];
  const productLabel_SI = [
    { color: 'rgb(255, 0, 0)', value: -20 },     // Vermelho
    { color: 'rgb(255, 127, 0)', value: -15 },   // Laranja
    { color: 'rgb(255, 255, 0)', value: -10 },   // Amarelo
    { color: 'rgb(0, 255, 0)', value: -5 },     // Verde
    { color: 'rgb(0, 0, 255)', value: 0 },     // Azul
    { color: 'rgb(75, 0, 130)', value: 5 },    // Índigo
    { color: 'rgb(148, 0, 211)', value: 10 },   // Violeta
    { color: 'rgb(148, 0, 211)', value: 15 },   // Violeta
    { color: 'rgb(148, 0, 211)', value: 20 },   // Violeta
  ];

  let productLabel: any;
  switch (sateliteView) {
    case 'CP':
      productLabel = productLabel_CP;
      break;
    case 'KI':
      productLabel = productLabel_KI;
      break;
    case 'LI':
      productLabel = productLabel_LI;
      break;
    case 'TT':
      productLabel = productLabel_TT;
      break;
    case 'SI':
      productLabel = productLabel_SI;
      break;
    default:
      productLabel = [];
  }

  return (
    <Tabs defaultValue="mapa" className="flex justify-center">
      <TabsList className="z-50 mt-5 absolute grid grid-cols-2 w-[400px]">
        <TabsTrigger value="mapa">Mapa</TabsTrigger>
        <TabsTrigger value="grafico">Gráfico</TabsTrigger>
      </TabsList>
      <TabsContent value="mapa" className="mt-0 absolute w-full h-full">
        <SatelliteLayer name={name} />
        <ColorLabel colorStops={productLabel} />
      </TabsContent>
      <TabsContent value="grafico" className="mt-0 absolute w-full h-full">
        <LineChartComponent valueRange={valueRange} stepRange={stepRange} name={name} chartData={chartData} />
      </TabsContent>
    </Tabs>
  )
}