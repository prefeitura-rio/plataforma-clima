// import PlaceholderContent from "@/components/demo/placeholder-content";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

// export default function RadarPage() {
//   return (
//     <ContentLayout title="Radar">
//       <PlaceholderContent />
//     </ContentLayout>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { RadarLayout } from "@/components/admin-panel/radar-layout";
import { TabsDemo } from "@/components/tabs-demo";
import { InfoButton } from "@/components/info-button";
import RadarLayer from "@/components/radar-map";
import ColorLabel from "@/components/color-label";


interface RadarViewProps {
  params: {
    radarView: string[];
  };
}

const RadarView = ({ params }: RadarViewProps) => {

  const [indice, view] = params.radarView;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  // const indice = "reflectivity".toLowerCase();  // forço o valor do índice

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gw.dados.rio/plataforma-clima-staging/radar/info/${indice.toLowerCase()}`);
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
    <RadarLayout title="Radar">
      {
          <>
            <RadarLayer name={name} radarView={indice} />
            <ColorLabel colorStops={productLabel} unit={unit} />
          </>
      }
      {/* <TabsDemo sateliteView={params.sateliteView} />
      <div className="absolute right-[30px] bottom-5">
        <InfoButton />
      </div> */}
    </RadarLayout>
  );
};

export default RadarView;