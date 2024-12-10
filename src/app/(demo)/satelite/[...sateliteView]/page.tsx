"use client";

import React, { useEffect, useState } from "react";
import { SateliteLayout } from "@/components/admin-panel/satelite-layout";
import { TabsDemo } from "@/components/tabs-demo";
import { InfoButton } from "@/components/info-button";
import SatelliteLayer from "@/components/satelite-map";
import ColorLabel from "@/components/color-label";
import { LineChartComponent } from "@/components/ui/line-chart";


interface SateliteViewProps {
  params: {
    sateliteView: string[];
  };
}

const SateliteView = ({ params }: SateliteViewProps) => {

  const [indice, view] = params.sateliteView;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rootUrl = process.env.NEXT_PUBLIC_ENV === 'production'
          ? process.env.NEXT_PUBLIC_ROOT_URL_PROD
          : process.env.NEXT_PUBLIC_ROOT_URL_DEV;
        const apiUrl = `${rootUrl}satellite/info/${indice.toLowerCase()}`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      }
      catch (error) {
        // console.error('Error fetching data:', error);
        // setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [indice]);

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
    <SateliteLayout title="Satélite" view={view} indice={indice}>
      {
        view == "mapa" ? (
          <>
            <SatelliteLayer name={name} sateliteView={indice} />
            <ColorLabel colorStops={productLabel} unit={unit} />
          </>
        ) : (
          <LineChartComponent unit={unit} valueRange={valueRange} stepRange={stepRange} name={name} sateliteView={indice} />
        )
      }
    </SateliteLayout>
  );
};

export default SateliteView;