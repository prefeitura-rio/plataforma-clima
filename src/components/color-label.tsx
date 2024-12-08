import React from 'react';

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

export default function ColorBar({
  colorStops,
  unit,
  height = 450,
  width = 15,
}: ColorPaletteProps) {
  const minValue = Math.min(...colorStops.map(item => item.value));
  const maxValue = Math.max(...colorStops.map(item => item.value));
  const range = maxValue - minValue;

  // Sort the colorStops in descending order
  const sortedColorStops = [...colorStops].sort((a, b) => b.value - a.value);

  const getPosition = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 pt-10 rounded-lg">
      <div className="relative h-5 mb-8">
        <div className="flex justify-center absolute w-full text-center text-black font-bold -top-8">
          {unit && (
            <div className="absolute bg-black text-white font-bold text-sm px-2 py-1 rounded-full">
              {unit}
            </div>
          )}
        </div>
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0%" x2="100%" y2="0%">
              {colorStops.map((item, index) => (
                <stop
                  key={index}
                  offset={`${getPosition(item.value)}%`}
                  stopColor={item.color}
                  stopOpacity="0.6"
                />
              ))}
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#colorGradient)" rx="10" ry="10" />
        </svg>
        {colorStops.map((item, index) => (
          <div
            key={index}
            className="absolute top-full mt-1 transform -translate-x-1/2 text-xs"
            style={{ left: `${getPosition(item.value)}%` }}
          >
            <div className="h-2 w-px bg-gray-400 mb-1 mx-auto"></div>
            <div className="text-black font-bold text-sm text-right">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}