"use client";

import React, { useEffect, useState } from "react";
import { ModelLayout } from "@/components/admin-panel/model-layout";
import { TabsDemo } from "@/components/tabs-demo";
import { InfoButton } from "@/components/info-button";
import ModelLayer from "@/components/rionowcast-v1-map";
import ColorLabel from "@/components/color-label";
import { LineChartComponent } from "@/components/ui/line-chart";

interface ModelViewProps {
  params: {
    modelView: string[];
  };
}

const ModelView = ({ params }: ModelViewProps) => {
  const [view] = params.modelView;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const time_horizon_ = "1h";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rootUrl = process.env.NEXT_PUBLIC_ENV === 'production'
          ? process.env.NEXT_PUBLIC_ROOT_URL_PROD
          : process.env.NEXT_PUBLIC_ROOT_URL_DEV;
        const apiUrl = `${rootUrl}nowcasting_models/info/v1`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [view]);

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
    <ModelLayout title="Modelo">
      <>
        <ModelLayer name={name} modelView={view} time_horizon={time_horizon_} />
        <ColorLabel colorStops={productLabel} unit={unit} />
      </>
    </ModelLayout>
  );
};

export default ModelView;