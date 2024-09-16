"use client";

import LocationAggregatorMap from "@/components/satelite-map";
import React, { useState, useEffect } from "react";
import GraficoContent from "../grafico-content";
import { SateliteLayout } from "@/components/admin-panel/satelite-layout";
import {mockData} from "./mockData";

const SateliteView = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const getData = async () => {

     

      // Create an array of geo coordinates pairs
      const coords = mockData.map((item) => [
        item.longitude,
        item.latitude,
        item.li
      ]);
      setCoordinates(coords);
    };
    getData();
  }, []);

  const fakeData = {
    cp: { img: 'https://example.com/cp.png', val: '10' },
    ki: { img: 'https://example.com/ki.png', val: '20' },
    li: { img: 'https://example.com/li.png', val: '30' },
    si: { img: 'https://example.com/si.png', val: '40' },
    tt: { img: 'https://example.com/tt.png', val: '50' },
    time: '2023-10-01T10:00:00Z',
  };

  return (
    <SateliteLayout title="Satélite" className="overflow-hidden">
      <LocationAggregatorMap data={coordinates} />
      <GraficoContent sateliteView={""} data={fakeData} />
    </SateliteLayout>
  );
};

export default SateliteView;