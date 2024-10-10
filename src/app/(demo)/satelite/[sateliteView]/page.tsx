"use client";

import React from "react";
import { SateliteLayout } from "@/components/admin-panel/satelite-layout";
import { TabsDemo } from "@/components/tabs-demo";
import { InfoButton } from "@/components/info-button";


interface SateliteViewProps {
  params: {
    sateliteView: string;
  };
}

const SateliteView = ({ params }: SateliteViewProps) => {

  return (
    <SateliteLayout title="Satélite">
      <TabsDemo sateliteView={params.sateliteView} />
      <div className="absolute right-[30px] bottom-5">
        <InfoButton />
      </div>
    </SateliteLayout>
  );
};

export default SateliteView;