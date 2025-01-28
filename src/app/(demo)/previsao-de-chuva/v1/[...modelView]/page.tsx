"use client";

import React, { useEffect, useState } from "react";
import { ModelLayout } from "@/components/admin-panel/model-layout";
import ModelLayer from "@/components/rionowcast-v1-map";
import ColorLabel from "@/components/color-label";
import { Button } from "@/components/ui/button";

interface ModelViewProps {
  params: {
    modelView: string[];
  };
}

const ModelView = ({ params }: ModelViewProps) => {
  const [view] = params.modelView;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const time_horizon_ = "1h";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
        const apiUrl = `${rootUrl}/nowcasting_models/info/v1`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [view]);

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <p className="text-white mb-4">{error}</p>
        <Button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => location.reload()} // Simple refresh to retry
        >
          Algo deu errado. Tente novamente.
        </Button>
      </div>
    );
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
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <>
        <ModelLayer name={name} modelView={view} time_horizon={time_horizon_} />
        <ColorLabel colorStops={productLabel} unit={unit} />
      </>
    </ModelLayout>
  );
};

export default ModelView;