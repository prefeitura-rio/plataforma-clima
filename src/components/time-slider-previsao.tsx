"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayIcon, PauseIcon } from "lucide-react";

interface TimeSliderPrevisaoProps {
  name?: string;
  onTimeChange?: (time: number) => void;
  sliderValue?: number;
  timestamps?: string[];
  imagesData?: { timestamp: string, image_url: string }[];
  isDataLoaded?: boolean;
}

export function TimeSliderPrevisao({
  name = "Produto",
  onTimeChange = () => { },
  sliderValue = 0,
  timestamps = [],
  imagesData = [],
  isDataLoaded = false,
}: TimeSliderPrevisaoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentValue, setCurrentValue] = useState(sliderValue);

  const handleSliderChange = (value: number[]) => {
    let newValue = value[0] % timestamps.length; // loop through available timestamps

    // verifica se o timestamp tem image_url vazio (artificial) e pula para o próximo válido
    while (imagesData[newValue]?.image_url === "") {
      newValue = (newValue + 1) % timestamps.length;
    }

    setCurrentValue(newValue);
    onTimeChange(newValue);
    // console.log("Slider value changed to", newValue ?? "");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && isDataLoaded) {
      interval = setInterval(() => {
        setCurrentValue((prevValue) => {
          let newValue = (prevValue + 1) % timestamps.length;

          // Pular timestamps artificiais sem image_url
          while (imagesData[newValue]?.image_url === "") {
            newValue = (newValue + 1) % timestamps.length;
          }

          onTimeChange(newValue);
          return newValue;
        });
      }, 3600);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isDataLoaded, timestamps.length, onTimeChange, imagesData]);


  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // console.log(isPlaying ? "Paused" : "Playing");
  };

  const [currentTimePlus3Hours, setCurrentTimePlus3Hours] = useState('');

  useEffect(() => {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTimePlus3Hours(formattedTime);
  }, []);

  return (
    <div className="z-50 fixed bottom-2 w-[90%] sm:w-[50%] py-2 px-4 rounded-lg bg-gray-800 text-white">
      <div className="flex items-center mb-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handlePlayPause}
          disabled={!isDataLoaded} // Disable button until data is loaded
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </Button>
        <div className="ml-2">
          <h2 className="text-md font-semibold">Previsão de Chuva - {name}</h2>
          <p className="text-sm text-gray-400">
            {timestamps.length > 0 ?
              `${new Date(timestamps[sliderValue]).toLocaleDateString('pt-BR')} ${new Date(timestamps[sliderValue]).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}h`
              : "No data"}
          </p>
        </div>
      </div>
      <Slider
        value={[sliderValue]}
        min={0}
        max={timestamps.length - 1}
        step={1}
        className="my-1"
        onValueChange={handleSliderChange}
        disabled={!isDataLoaded} // Disable slider until data is loaded
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span className="mt-2">Daqui a 1 hora</span>
        <span className="mt-2">Daqui a 3 horas</span>
      </div>
    </div>
  );
}