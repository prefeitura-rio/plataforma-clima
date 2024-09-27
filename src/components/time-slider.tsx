"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PlayIcon, PauseIcon } from "lucide-react"

interface TimeSliderProps {
  name: string;
  onTimeChange: (time: number) => void;
}

export function TimeSlider({ name, onTimeChange }: TimeSliderProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const getCurrentDate = () => {
    const date = new Date()
    return date.toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  const getPreviousHours = () => {
    const date = new Date();
    const currentHour = date.getHours();
    const prevHour1 = (currentHour - 1 + 24) % 24;
    const prevHour2 = (currentHour - 2 + 24) % 24;
    return [prevHour2, prevHour1, "Now"];
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = (prevTime + 1) % 14; // Reset to 0 when reaching 13
          console.log(`Slider value: ${newTime}`)
          onTimeChange(newTime)
          return newTime
        })
      }, 500)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    console.log(isPlaying ? "Paused" : "Playing")
  }

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0] % 13; // Reset to 0 when reaching 13
    setCurrentTime(newValue)
    onTimeChange(newValue)
  }

  const formatTime = (hour: number | string) => {
    if (hour === "Now") return "Now";
    if (hour === 12) return "12PM";
    if (typeof hour === "number" && hour > 12) return `${hour - 12}PM`;
    return `${hour}AM`;
  };

  return (
    <div className="z-50 absolute w-[50%] py-2 px-4 rounded-lg bg-gray-800 text-white">
      <div className="flex items-center mb-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handlePlayPause}
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </Button>
        <div className="ml-2">
          <h2 className="text-md font-semibold">Histórico de 12h - {name}</h2>
          <p className="text-sm text-gray-400">{getCurrentDate()}</p>
        </div>
      </div>
      <Slider
        value={[currentTime]}
        min={0}
        max={13}
        step={1}
        className="my-1"
        onValueChange={handleSliderChange}
      />
      <div className="flex justify-between text-xs text-gray-400">
        {getPreviousHours().map((hour) => (
          <span className="mt-2" key={hour}>{formatTime(hour)}</span>
        ))}
      </div>
    </div>
  )
}