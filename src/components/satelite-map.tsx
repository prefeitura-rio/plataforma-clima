//@ts-nocheck
"use client";

import React, { useState, useEffect } from 'react';
import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapViewState } from '@deck.gl/core';
import './mapbox.css';
import { BitmapLayer } from '@deck.gl/layers';
import { TimeSlider } from './time-slider';
import { useToast } from "@/hooks/use-toast"

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -43.70632,
  latitude: -22.92106,
  zoom: 6.38,
  minZoom: 5,
  maxZoom: 15,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface SatelliteLayerProps {
  name: string;
  sateliteView: string;
}

export default function SatelliteLayer({
  name,
  sateliteView
}: SatelliteLayerProps) {
  const { toast } = useToast()
  const [sliderValue, setSliderValue] = useState(0);
  const [imagesData, setImagesData] = useState<{ timestamp: string, image_url: string }[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        const currentTime = new Date();

        // Aproximando o horário atual para o valor anterior de 10 minutos e 20 segundos
        currentTime.setSeconds(20, 0);
        const minutes = currentTime.getMinutes();
        currentTime.setMinutes(Math.floor(minutes / 10) * 10);

        // Subtrair 3 horas para ajustar para o fuso horário de Brasília (UTC-3)
        const currentTimeBrasilia = new Date(currentTime.getTime());
        const startTimeBrasilia = new Date(currentTimeBrasilia.getTime() - 12 * 60 * 60 * 1000); // 12 horas atrás

        const product = sateliteView.toLowerCase();

        // Ajustar os timestamps para o fuso horário de Brasília antes de enviar ao backend
        const response = await fetch(
          `https://gw.dados.rio/plataforma-clima-staging/satellite/goes16/gif/${product}?start_time=${startTimeBrasilia.toISOString()}&end_time=${currentTimeBrasilia.toISOString()}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();

        // Preencher o array com os timestamps faltantes
        const filledData = fillMissingTimestamps(data, startTimeBrasilia, currentTimeBrasilia);
        setImagesData(filledData);
        setIsDataLoaded(true);
      } catch (error) {
        setIsDataLoaded(false);
      }
    };

    fetchImagesData();
  }, [sateliteView, toast]);

  const fillMissingTimestamps = (data, startTime, endTime) => {
    const result = [];
    const intervalMs = 10 * 60 * 1000; // 10 minutos em milissegundos
    let currentTimestamp = startTime.getTime();

    // Iterar sobre o intervalo de tempo, adicionando o que falta
    for (let i = 0; currentTimestamp <= endTime.getTime(); i++) {
      const currentDate = new Date(currentTimestamp);

      // Encontra se já existe um objeto com o timestamp atual na resposta da API
      const existingEntry = data.find(item => new Date(item.timestamp).getTime() === currentTimestamp);

      if (existingEntry) {
        result.push(existingEntry); // Mantém o timestamp da API
      } else {
        // Preenche as lacunas com novos objetos
        result.push({
          timestamp: currentDate.toISOString(),
          image_url: ``,
        });
      }

      currentTimestamp += intervalMs; // Incrementa 10 minutos

    }

    return result;
  };
  const handleTimeChange = (time: number) => {
    setSliderValue(time);
  };

  const getCurrentImage = (sliderValue: number) => {
    return imagesData[sliderValue]?.image_url || "";
  };

  const layer = new BitmapLayer({
    id: 'BitmapLayer',
    opacity: 0.6,
    bounds: [-45.05290312102409, -23.801876626302175, -42.35676996062447, -21.699774257353113],
    image: getCurrentImage(sliderValue),
    pickable: true,
    textureParameters: {
      minFilter: 'nearest',
      magFilter: 'nearest'
    }
  });

  return (
    <div className="mt-0 absolute w-full h-full">
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={[layer]}>
        <Map reuseMaps mapboxAccessToken={MAPBOX_API_KEY} mapStyle={MAP_STYLE} />
      </DeckGL>
      {isDataLoaded &&
        <div className="flex justify-center items-end h-full pb-5">
          <TimeSlider
            name={name}
            onTimeChange={handleTimeChange}
            sliderValue={sliderValue}
            timestamps={imagesData?.map(image => image.timestamp)}
            imagesData={imagesData}
            isDataLoaded={isDataLoaded}
          />
        </div>
      }
    </div>
  );
}