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
        const response = await fetch(`https://gw.dados.rio/plataforma-clima-staging/satellite/info/${indice.toLowerCase()}`);
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
    <SateliteLayout title="Satélite">
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
      {/* <TabsDemo sateliteView={params.sateliteView} />
      <div className="absolute right-[30px] bottom-5">
        <InfoButton />
      </div> */}
    </SateliteLayout>
  );
};

export default SateliteView;