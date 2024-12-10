'use client'

import React, { useEffect, useState } from 'react';
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

export function TabsDemo({ sateliteView }: SateliteContentProps) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rootUrl = process.env.NEXT_PUBLIC_ENV === 'production'
          ? process.env.NEXT_PUBLIC_ROOT_URL_PROD
          : process.env.NEXT_PUBLIC_ROOT_URL_DEV;

        const response = await fetch(`${rootUrl}satellite/info/${sateliteView.toLowerCase()}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [sateliteView]);

  if (error) {
    return <div>{error}</div>;
  }

  const product = data?.product || {};
  const values_range = data?.values_range || {};
  const legend = data?.legend || { colors: [] };

  if (!product || !values_range || !legend) {
    return <div>Invalid data</div>;
  }

  const { name, unit } = product;
  const valueRange = [values_range.min, values_range.max];
  const stepRange = legend.colors.map((colorStop: any) => colorStop?.value);
  const productLabel = legend.colors.map((colorStop: any) => ({
    color: colorStop.color,
    value: colorStop.value,
  }));

  return (
    <Tabs defaultValue="mapa" className="flex justify-center">
      <TabsList className="z-50 mt-5 absolute grid grid-cols-2 w-[400px]">
        <TabsTrigger value="mapa">Mapa</TabsTrigger>
        <TabsTrigger value="grafico">Gráfico</TabsTrigger>
      </TabsList>
      <TabsContent value="mapa" className="mt-0 absolute w-full h-full">
        <SatelliteLayer name={name} sateliteView={sateliteView} />
        <ColorLabel colorStops={productLabel} unit={unit} />
      </TabsContent>
      <TabsContent value="grafico" className="mt-0 absolute w-full h-full">
        <LineChartComponent unit={unit} valueRange={valueRange} stepRange={stepRange} name={name} sateliteView={sateliteView} />
      </TabsContent>
    </Tabs>
  )
}