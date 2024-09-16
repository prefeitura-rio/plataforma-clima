import React from 'react';
import { createRoot } from 'react-dom/client';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapViewState } from '@deck.gl/core';


const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -43.45632,
  latitude: -22.92106,
  zoom: 7.38,
  minZoom: 5,
  maxZoom: 15,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'mapbox://styles/escritoriodedados/clgfevcvc009101p9ax017bah';
const MAPBOX_API_KEY = 'pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w';

type DataPoint = { longitude: number, latitude: number, li: number };

export default function HeatMap({
  data = mockData,
  intensity = 1,
  threshold = 0.1,
  radiusPixels = 10,
  mapStyle = MAP_STYLE
}: {
  data?: string | DataPoint[];
  intensity?: number;
  threshold?: number;
  radiusPixels?: number;
  mapStyle?: string;
}) {
  const colorRange = [
    [148, 0, 211],   // Violeta
    [75, 0, 130],    // Índigo
    [0, 0, 255],     // Azul
    [0, 255, 0],     // Verde
    [255, 255, 0],   // Amarelo
    [255, 127, 0],   // Laranja
    [255, 0, 0]      // Vermelho
  ];

  const layers = [
    new HeatmapLayer<DataPoint>({
      data,
      id: 'heatmap-layer',
      pickable: false,
      getPosition: d => [d.longitude, d.latitude],
      getWeight: d => d.li,
      radiusPixels,
      intensity,
      threshold,
      colorRange,
      aggregation: "MEAN",
      colorDomain: [0, 10],
    })
  ];

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
      <Map reuseMaps mapboxAccessToken={MAPBOX_API_KEY} mapStyle={MAP_STYLE} preventStyleDiffing={true} />
    </DeckGL>
  );
}

