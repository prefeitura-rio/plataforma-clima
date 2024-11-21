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

  const [indice, view] = params.modelView;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const time_horizon_ = "2h";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gw.dados.rio/plataforma-clima-staging/nowcasting_models/info/${indice.toLowerCase()}`);
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
    <ModelLayout title="Modelo">
      {
        (
          <>
            <ModelLayer name={name} modelView={indice} time_horizon={time_horizon_} />
            <ColorLabel colorStops={productLabel} unit={unit} />
          </>
        )        
      }
      {/* <TabsDemo modelView={params.modelView} />
      <div className="absolute right-[30px] bottom-5">
        <InfoButton />
      </div> */}
    </ModelLayout>
  );
};

export default ModelView;