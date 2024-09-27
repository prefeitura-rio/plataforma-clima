"use client";

import React from 'react'

interface ColorStop {
  color: string
  value: number
}

interface ColorPaletteProps {
  colorStops: ColorStop[]
  height?: number
  width?: number
}

export default function ColorLabel({ colorStops, height = 450, width = 15 }: ColorPaletteProps) {
  const sortedStops = [...colorStops].sort((a, b) => a.value - b.value)
  const minValue = sortedStops[0].value
  const maxValue = sortedStops[sortedStops.length - 1].value

  const gradient = sortedStops
    .map(
      (stop) =>
        `${stop.color} ${((stop.value - minValue) / (maxValue - minValue)) * 100}%`
    )
    .join(', ')

  return (
    <div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 flex items-center p-6 rounded-lg"
    >
      <div className="mr-2 flex flex-col justify-between h-[430px] text-black font-bold text-sm text-right">
        {sortedStops.map((stop, i) => (
          <span key={i}>{stop.value}</span>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            height: `${height}px`,
            width: `${width}px`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${gradient})`,
            }}
          />
        </div>
      </div>
    </div>
  )
}