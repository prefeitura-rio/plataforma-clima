"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayIcon, PauseIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

interface TimeSliderProps {
  name?: string;
  onTimeChange?: (time: number) => void;
  sliderValue?: number;
  timestamps?: string[];
  imagesData?: { timestamp: string; image_url: string }[];
  isDataLoaded?: boolean;
}

export function TimeSlider({
  name = "Produto",
  onTimeChange = () => { },
  sliderValue = 0,
  timestamps = [],
  imagesData = [],
  isDataLoaded = false,
}: TimeSliderProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentValue, setCurrentValue] = useState(sliderValue);
  const [currentTimePlus3Hours, setCurrentTimePlus3Hours] = useState("");
  const [showImage, setShowImage] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handleShowControls = () => {
    if (!showImage) {
      setShowImage(true);
      setTimeout(() => setShowImage(false), 3000);
    }
  };

  useEffect(() => {
    const now = new Date();
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    const utcMinus3 = new Date(utcNow - 3 * 60 * 60 * 1000); // Adjust to UTC-3
    const formattedTime = utcMinus3.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCurrentTimePlus3Hours(formattedTime);
  }, [timestamps]);


  const handleSliderChange = (value: number[]) => {
    handleShowControls();
    let newValue = value[0] % timestamps.length;

    while (imagesData[newValue]?.image_url === "") {
      newValue = (newValue + 1) % timestamps.length;
    }

    setIsPlaying(false);
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
      }, 500);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isDataLoaded, timestamps.length, onTimeChange, imagesData]);

  const handlePlayPause = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleShowControls();
    setIsPlaying(!isPlaying);
    event.currentTarget.blur(); // Remove focus from the button
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

  return (
    <div className="z-50 fixed bottom-2 w-[90%] sm:w-[50%] py-2 px-4 rounded-lg bg-gray-800 text-white">
      <div
        className={`absolute w-full bottom-full mb-2 ml-[-16px] transition-opacity duration-[1500ms] ${showImage && !isMobile ? "opacity-100" : "opacity-0"
          }`}
      >
        <Image src="/arrows_buttons.svg" width={250} height={250} alt="Imagem" />
      </div>
      <div className="flex items-center mb-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handlePlayPause}
          disabled={!isDataLoaded}
          onMouseDown={handleShowControls}
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </Button>
        <div className="ml-2">
          <h2 className="text-md font-semibold">Histórico de 12h - {name}</h2>
          <p className="text-sm text-gray-400">
            {timestamps.length > 0
              ? new Date(timestamps[sliderValue]).toLocaleString("pt-BR")
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
        disabled={!isDataLoaded}
        onMouseDown={handleShowControls}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span className="mt-2">Há 12h</span>
        <span className="mt-2">{currentTimePlus3Hours}</span>
      </div>
    </div>
  );
}
