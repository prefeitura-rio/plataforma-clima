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
  if (!colorStops || colorStops.length === 0) {
    return null; // Return null or a loading spinner if data is not available
  }

  const minValue = Math.min(...colorStops.map(item => item.value));
  const maxValue = Math.max(...colorStops.map(item => item.value));
  const range = maxValue - minValue;

  // Sort the colorStops in descending order
  const sortedColorStops = [...colorStops].sort((a, b) => b.value - a.value);

  const getPosition = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  return (
    <div
      className="w-full max-w-xl mx-auto px-5 py-3 md:mt-2 rounded-xl"
      style={{
        backgroundColor: 'rgba(33, 41, 54, 0.2)', // Set the background color
        position: 'relative',   // Ensure the position is set for z-index to take effect
        zIndex: 0,           // Higher z-index to place it above the Mapbox map
      }}
    >
      <div className="relative h-6 mb-8">
        <div className="flex justify-center absolute w-full text-center text-black font-bold -top-8">
          {/* {unit && (
            <div className="absolute bg-black text-white font-bold text-sm px-2 py-1 rounded-full">
              {unit}
            </div>
          )} */}
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
          {unit == "mm/h" &&
            colorStops.map((item, index) => {
              const getImageSrc = (value: any) => {
                if (value === 0.02) return '/rain.svg';
                if (value === 10) return '/moderate_rain.svg';
                if (value === 30) return '/heavy_rain.svg';
                if (value === 50) return '/very_heavy_rain.svg';
                return '';
              };
              return (
                <image
                  key={index}
                  href={getImageSrc(item.value)}
                  x={`${getPosition(item.value == 10 ? 9 : item.value == 30 ? 25 : item.value)}%`}
                  y="50%"
                  width="20"
                  height="20"
                  transform={index === 0 ? 'translate(1,-10)' : 'translate(-10,-10)'}
                />
              );
            })}
          <text x="98.5%" y="50%" dy="0.35em" textAnchor="end" fill="#FFFFFF" fontSize="13" fontWeight="bold">
            {unit}
          </text>
        </svg>
        {colorStops.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === colorStops.length - 1;
          return (
            <div
              key={index}
              className="absolute top-full mt-1 transform -translate-x-1/2 text-xs"
              style={{
                left: `${getPosition(item.value)}%`,
              }}
            >
              <div className="h-2 w-px bg-gray-600 mb-1 mx-auto"></div>
              <div className="text-black text-sm text-right">
                {item.value}
                {item.value == 90 && '+'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}