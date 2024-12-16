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
  imagesData?: { timestamp: string; image_url: string }[];
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
    let newValue = value[0] % timestamps.length;

    while (imagesData[newValue]?.image_url === "") {
      newValue = (newValue + 1) % timestamps.length;
    }

    setIsPlaying(false); // Pause playback when slider is moved
    setCurrentValue(newValue);
    onTimeChange(newValue);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && isDataLoaded) {
      interval = setInterval(() => {
        setCurrentValue((prevValue) => {
          let newValue = (prevValue + 1) % timestamps.length;

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
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isDataLoaded) return;

    switch (event.key) {
      case "ArrowRight":
        setIsPlaying(false); // Pause playback
        setCurrentValue((prevValue) => {
          let newValue = (prevValue + 1) % timestamps.length;
          while (imagesData[newValue]?.image_url === "") {
            newValue = (newValue + 1) % timestamps.length;
          }
          onTimeChange(newValue);
          return newValue;
        });
        break;
      case "ArrowLeft":
        setIsPlaying(false); // Pause playback
        setCurrentValue((prevValue) => {
          let newValue = (prevValue - 1 + timestamps.length) % timestamps.length;
          while (imagesData[newValue]?.image_url === "") {
            newValue = (newValue - 1 + timestamps.length) % timestamps.length;
          }
          onTimeChange(newValue);
          return newValue;
        });
        break;
      case " ":
        setIsPlaying((prev) => !prev); // Toggle play/pause
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDataLoaded, timestamps.length, imagesData]);

  const [currentTimePlus3Hours, setCurrentTimePlus3Hours] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          disabled={!isDataLoaded}
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </Button>
        <div className="ml-2">
          <h2 className="text-md font-semibold">Previsão de Chuva - {name}</h2>

        </div>
      </div>
      <Slider
        value={[sliderValue]}
        min={0}
        max={timestamps.length - 1}
        step={1}
        className="my-1"
        onValueChange={handleSliderChange}
        disabled={!isDataLoaded}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span className="mt-2">{new Date(timestamps[0]).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}h</span>
        <span className="mt-2">{new Date(timestamps[1]).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}h</span>
        <span className="mt-2">{new Date(timestamps[2]).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}h</span>

      </div>
    </div>
  );
}
