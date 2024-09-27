"use client";

import React, { useState } from 'react';
import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapViewState } from '@deck.gl/core';
import './mapbox.css';
import { BitmapLayer } from '@deck.gl/layers';
import { TimeSlider } from './time-slider';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -42.50632,
  latitude: -22.52106,
  zoom: 6.38,
  minZoom: 5,
  maxZoom: 15,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
const MAPBOX_API_KEY = 'pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w';

interface SatelliteLayerProps {
  name: string;
}

export default function SatelliteLayer({
  name
}: SatelliteLayerProps) {

  const [sliderValue, setSliderValue] = useState(0);

  const handleTimeChange = (time: number) => {
    setSliderValue(time);
  };

  const getImageIndex = (sliderValue: number): number => {
    const mapping: { [key: number]: number } = {
      5: 1,
      6: 2,
      7: 3,
      8: 4,
      9: 1,
      10: 2,
      11: 3,
      12: 4,
      13: 1,
      14: 2,
      15: 3,
      16: 4,
    };
    return mapping[sliderValue] || sliderValue;
  };

  const layer = new BitmapLayer({
    id: 'BitmapLayer',
    bounds: [-45.0, -23.873, -42.0, -22.103],
    image: `https://docs.mapbox.com/mapbox-gl-js/assets/radar${getImageIndex(sliderValue)}.gif`,
    pickable: true
  });

  return (
    <div className="mt-0 absolute w-full h-full">
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={[layer]}>
        <Map reuseMaps mapboxAccessToken={MAPBOX_API_KEY} mapStyle={MAP_STYLE}>
        </Map>
      </DeckGL>
      <div className="flex justify-center items-end h-full pb-5">
        <TimeSlider name={name} onTimeChange={handleTimeChange} />
      </div>
    </div>
  );
}