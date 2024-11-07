// import Link from "next/link";

// import PlaceholderContent from "@/components/demo/placeholder-content";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator
// } from "@/components/ui/breadcrumb";

// export default function ChuvaPage() {
//   return (
//     <ContentLayout title="Previsão de Chuva">
//       <PlaceholderContent />
//     </ContentLayout>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { SateliteLayout } from "@/components/admin-panel/satelite-layout";
import { TabsDemo } from "@/components/tabs-demo";
import { InfoButton } from "@/components/info-button";
import SatelliteLayer from "@/components/impa-nowcastnet-map";
import ColorLabel from "@/components/color-label";
import { LineChartComponent } from "@/components/ui/line-chart";


interface ModelViewProps {
  params: {
    modelView: string[];
  };
}

const ModelView = ({ params }: ModelViewProps) => {

  const [indice, view] = params.modelView;
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
            <SatelliteLayer name={name} modelView={indice} />
            <ColorLabel colorStops={productLabel} unit={unit} />
          </>
        ) : (
          <LineChartComponent unit={unit} valueRange={valueRange} stepRange={stepRange} name={name} modelView={indice} />
        )
      }
      {/* <TabsDemo modelView={params.modelView} />
      <div className="absolute right-[30px] bottom-5">
        <InfoButton />
      </div> */}
    </SateliteLayout>
  );
};

export default ModelView;