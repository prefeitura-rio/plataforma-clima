"use client";
// components/Map.jsx

import React, { useState } from "react";

import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";

// import map config
import {
  lightingEffect,
  material,
  INITIAL_VIEW_STATE,
  colorRange,
} from "../lib/mapconfig.js";

const LocationAggregatorMap = ({
  upperPercentile = 100,
  coverage = 1,
  data,
}) => {

  // creating tooltip
  function getTooltip({ object }) {
    if (!object) {
      return null;
    }
    console.log("object", object);
    const lat = object.position[1];
    const lng = object.position[0];
    const count = object.points.length;

    return `\
        latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
        longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
        ${count} locations here`;
  }

  const layers = [
    new HexagonLayer({
      id: "heatmap",
      colorRange,
      opacity: 0.1,
      coverage,
      data,
      elevationRange: [0, 3000],
      elevationScale: data && data.length ? 50 : 0,
      // extruded: true,
      getPosition: (d) => d,
      pickable: true,
      radius: 1000,
      upperPercentile,

      getColorWeight: (point) => {
        // Assuming each point is a coordinate with an 'li' value
        const liValue = point[2]; // The 'li' value at the 3rd index
        return liValue;
      },

      getColorValue: (points) => {
        // Normalize 'li' value to a range between 0 and 1
        const liSum = points.reduce((sum, point) => sum + point[2], 0);
        const liAvg = liSum / points.length;
        // Normalize liAvg to the range [0, 1] (assuming li ranges from -20 to 20)
        const normalizedLI = (liAvg + 20) / 40;
        return normalizedLI;
      },

      colorAggregation: 'MEAN',
      material,

      transitions: {
        elevationScale: 3000,
      },
    }),
  ];

  return (
    <div style={{ position: "fixed", width: '100%', height: '100%' }}>
      <DeckGL
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={getTooltip}
      >
        <Map
          controller={true}
          mapboxAccessToken="pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w"
          mapStyle="mapbox://styles/escritoriodedados/clgfevcvc009101p9ax017bah"
        ></Map>
      </DeckGL>
    </div>
  );
};

export default LocationAggregatorMap;
