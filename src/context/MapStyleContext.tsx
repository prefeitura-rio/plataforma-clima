//@ts-nocheck
"use client";

import React, { createContext, useContext, useState } from 'react';

interface MapStyleContextProps {
  mapStyle: string;
  setMapStyle: (style: string) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
}

const MapStyleContext = createContext<MapStyleContextProps | undefined>(undefined);

export const MapStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapStyle, setMapStyle] = useState('mapbox://styles/escritoriodedados/cm5mtyaev00bn01qpd39j2o97');
  const [opacity, setOpacity] = useState(0.6);

  return (
    <MapStyleContext.Provider value={{ mapStyle, setMapStyle, opacity, setOpacity }}>
      {children}
    </MapStyleContext.Provider>
  );
};

export const useMapStyle = () => {
  const context = useContext(MapStyleContext);
  if (!context) {
    throw new Error('useMapStyle must be used within a MapStyleProvider');
  }
  return context;
};