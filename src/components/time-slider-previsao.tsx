"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayIcon, PauseIcon, InfoIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';
import ControlButtons from "./controls-buttons";

interface TimeSliderPrevisaoProps {
  name?: string;
  onTimeChange?: (time: number) => void;
  sliderValue?: number;
  timestamps?: string[];
  imagesData?: { timestamp: string; image_url: string }[];
  isDataLoaded?: boolean;
}

export function TimeSliderPrevisao({
  name = "Carregando...",
  onTimeChange = () => { },
  sliderValue = 0,
  timestamps = [],
  imagesData = [],
  isDataLoaded = false,
}: TimeSliderPrevisaoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentValue, setCurrentValue] = useState(sliderValue);
  const [showImage, setShowImage] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isShortScreen = useMediaQuery({ query: '(max-width: 1119px)' });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleShowControls = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowImage(true);
    timeoutRef.current = setTimeout(() => setShowImage(false), 15000);
  };

  const handleSliderChange = (value: number[]) => {
    handleShowControls();

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

  const [currentTimePlus3Hours, setCurrentTimePlus3Hours] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCurrentTimePlus3Hours(formattedTime);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleInfoMouseEnter = () => {
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 10000);
  };

  return (
    <div className="z-50 fixed bottom-2 w-[90%] sm:w-[50%] py-2 px-4 rounded-lg bg-gray-800 text-white">
      <div
        className={`absolute w-72 bottom-full mb-[13px] ml-[-16px] transition-opacity duration-[1500ms] ${showImage && !isMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <ControlButtons
          onPlayPause={() => {
            handleShowControls();
            setIsPlaying((prev) => !prev);
          }}
          onBackward={() => {
            handleShowControls();
            setIsPlaying(false);
            setCurrentValue((prevValue) => {
              let newValue = (prevValue - 1 + timestamps.length) % timestamps.length;
              while (imagesData[newValue]?.image_url === "") {
                newValue = (newValue - 1 + timestamps.length) % timestamps.length;
              }
              onTimeChange(newValue);
              return newValue;
            });
          }}
          onForward={() => {
            handleShowControls();
            setIsPlaying(false);
            setCurrentValue((prevValue) => {
              let newValue = (prevValue + 1) % timestamps.length;
              while (imagesData[newValue]?.image_url === "") {
                newValue = (newValue + 1) % timestamps.length;
              }
              onTimeChange(newValue);
              return newValue;
            });
          }}
        />
      </div>
      <div
        className={`absolute bottom-full mb-${showImage && !isMobile && isShortScreen && showInfo ? 20 : 2} transition-opacity duration-[3000ms] ${showInfo ? "opacity-100" : "opacity-0"}`}
        style={{
          left: showImage && !isMobile && isShortScreen && showInfo ? 0 : "auto",
          right: showImage && !isMobile && isShortScreen && showInfo ? "auto" : 0,
        }}
      >
        <div className="relative max-w-64 p-2 rounded-lg bg-[#21293633]">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 text-white hover:bg-red-transparent"
            onClick={() => setShowInfo(false)}
          >
            <XIcon className="h-3 w-3 transform transition-transform duration-200 hover:scale-150" />
          </Button>
          <div className="ml-2">
            <h2 className="text-sm">
              Modelo ConvLSTM do grupo <a href="https://rionowcast.dexl.lncc.br/" target="_blank" className="text-blue-500 underline">Rionowcast</a>, em fase de testes. Para dados mais confiáveis, consulte o <a href="https://alertario.rio.rj.gov.br/24-horas/" target="_blank" className="text-blue-500 underline">Alerta Rio</a>.
            </h2>
          </div>
        </div>
      </div>

      {!showInfo && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-full mb-0 right-0 text-gray-800"
          onMouseEnter={handleInfoMouseEnter}
        >
          <InfoIcon className="h-4 w-4" />
        </Button>
      )}
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
          <h2 className="text-md font-semibold">{name}</h2>
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
        <span className="mt-2">
          {new Date(timestamps[0]).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          h
        </span>
        <span className="mt-2">
          {new Date(timestamps[1]).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          h
        </span>
        <span className="mt-2">
          {new Date(timestamps[2]).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          h
        </span>
      </div>
    </div>
  );
}