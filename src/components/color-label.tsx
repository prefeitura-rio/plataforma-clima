"use client";

import React from "react";

interface ColorStop {
  color: string;
  value: number;
}

interface ColorPaletteProps {
  colorStops: ColorStop[];
  unit: string;
  height?: number;
  width?: number;
}

export default function ColorLabel({
  colorStops,
  unit,
  height = 450,
  width = 15,
}: ColorPaletteProps) {
  const sortedStops = [...colorStops].sort((a, b) => a.value - b.value);
  const minValue = sortedStops[0]?.value;
  const maxValue = sortedStops[sortedStops.length - 1]?.value;

  // console.log("colorStops", colorStops);
  const range = maxValue - minValue;
  const getPosition = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex items-center p-6 rounded-lg">
      <div className="relative h-full" style={{ height: `${height}px`, width: `${width}px` }}>
        {unit &&
          <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 bg-black text-white font-bold text-sm px-2 py-1 rounded-full">
            {unit}
          </div>}
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {colorStops.map((item, index) => (
                <stop
                  key={index}
                  offset={`${getPosition(item.value)}%`}
                  stopColor={item.color}
                />
              ))}
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#colorGradient)" rx="7.5" ry="7.5" />
        </svg>
        {colorStops.map((item, index) => (
          <div
            key={index}
            className="absolute right-[30px] transform -translate-y-1/2 text-black font-bold text-sm text-right"
            style={{ top: `${getPosition(item.value)}%` }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}