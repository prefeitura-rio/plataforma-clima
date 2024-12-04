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
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from 'react-responsive';

const DESKTOP_VIEW_STATE: MapViewState = {
  longitude: -43.465832,
  latitude: -22.92106,
  zoom: 8.5,
  minZoom: 5,
  maxZoom: 15,
  pitch: 0,
  bearing: 0
};
const MOBILE_VIEW_STATE: MapViewState = {
  longitude: -43.465832,
  latitude: -22.92106,
  zoom: 7.5,
  minZoom: 5,
  maxZoom: 15,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface ModelLayerProps {
  name: string; // Ex: Modelo de Previsão de Chuva criado pelo grupo Rionowcast (v1).
  modelView: string; // Ex:v1
  time_horizon?: string; // Ex:1h
}

export default function ModelLayer({
  name,
  modelView,
  time_horizon
}: ModelLayerProps) {
  const { toast } = useToast();
  const [sliderValue, setSliderValue] = useState(0);
  const [imagesData, setImagesData] = useState<{ timestamp: string, image_url: string }[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const INITIAL_VIEW_STATE = isMobile ? MOBILE_VIEW_STATE : DESKTOP_VIEW_STATE;

  const fetchImagesData = async () => {
    try {
      const currentTime = new Date();

      // Aproximando o horário atual para o valor anterior de 10 minutos e 20 segundos
      currentTime.setSeconds(20, 0);
      const minutes = currentTime.getMinutes();
      currentTime.setMinutes(Math.floor(minutes / 10) * 10);

      // Subtrair 3 horas para ajustar para o fuso horário de Brasília (UTC-3)
      const currentTimeBrasilia = new Date(currentTime.getTime());
      const startTimeBrasilia = new Date(currentTimeBrasilia.getTime() - 6 * 60 * 60 * 1000); // 12 horas atrás

      const timeHorizon = time_horizon?.toLowerCase();
      const product = modelView.toLowerCase();

      // Ajustar os timestamps para o fuso horário de Brasília antes de enviar ao backend
      const response = await fetch(
        `https://gw.dados.rio/plataforma-clima-staging/nowcasting_models/rionowcast/gif/${product}/${time_horizon}?start_time=${startTimeBrasilia.toISOString()}&end_time=${currentTimeBrasilia.toISOString()}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        toast({
          title: "Aviso",
          description: "Nenhum dado disponível no momento.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: isMobile ? "bottom" : "top",
        });
      }

      // Preencher o array com os timestamps faltantes
      if (data.length > 0) {
        const filledData = fillMissingTimestamps(data, startTimeBrasilia, currentTimeBrasilia);
        setImagesData(filledData);
        setIsDataLoaded(true);
      }
    } catch (error) {
      setIsDataLoaded(false);
      toast({
        title: error.message,
        description: "Erro ao buscar dados.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: isMobile ? "bottom" : "top",
      });
    }
  };

  useEffect(() => {
    fetchImagesData();
    const intervalId = setInterval(fetchImagesData, 60000); // refresh the data each 1 minute

    return () => clearInterval(intervalId); // cleanup interval on component unmount
  }, []);

  const fillMissingTimestamps = (data, startTime, endTime) => {
    const result = [];
    const intervalMs = 10 * 60 * 1000; // 10 minutes in milliseconds
    let currentTimestamp = startTime.getTime();

    // Iterate over the time interval, adding missing timestamps
    for (let i = 0; currentTimestamp <= endTime.getTime(); i++) {
      const currentDate = new Date(currentTimestamp);

      // Find if there is already an object with the current timestamp in the API response
      const existingEntry = data.find(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.getHours() === currentDate.getHours() && itemDate.getMinutes() === currentDate.getMinutes();
      });

      if (existingEntry) {
        result.push(existingEntry); // Keep the timestamp from the API
      } else {
        // Fill gaps with new objects
        result.push({
          timestamp: currentDate.toISOString(),
          image_url: ``,
        });
      }

      currentTimestamp += intervalMs; // Increment by 10 minutes
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
    bounds: [-43.8894771422364, -23.13181404239338, -43.04947714223637, -22.65181404239336],
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
      {isDataLoaded && imagesData.length > 0 &&
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

