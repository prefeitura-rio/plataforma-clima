"use client";

import LocationAggregatorMap from "@/components/satelite-map";
import React, { useState, useEffect } from "react";
import GraficoContent from "../grafico-content";
import { SateliteLayout } from "@/components/admin-panel/satelite-layout";


const SateliteView = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const getData = async () => {

      const data = [
        { longitude: -43.480882311016614, latitude: -22.997276243898057, li: 7.1394935 },
        { longitude: -43.30331937634688, latitude: -22.875192772923953, li: 3.12121 },
        { longitude: -45.01279607536490, latitude: -21.708288842894100, li: 4.343223 },
        { longitude: -44.99675325710120, latitude: -21.708288842894100, li: 19.20323 },
        { longitude: -44.980710438837600, latitude: -21.708288842894100, li: 9.21234 },
      ];

      // Create an array of geo coordinates pairs
      const coords = data.map((item) => [
        item.longitude,
        item.latitude,
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