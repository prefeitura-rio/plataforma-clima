import Image from 'next/image';
import React from 'react';
import { Button } from "@/components/ui/button";
import { XIcon } from 'lucide-react';

interface ControlButtonsProps {
  onPlayPause: () => void;
  onBackward: () => void;
  onForward: () => void;
  onClose: () => void; // New prop for handling close button
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onPlayPause,
  onBackward,
  onForward,
  onClose, // Accept the new prop
}) => {
  const handleButtonClick = (callback: () => void, event: React.MouseEvent<HTMLButtonElement>) => {
    callback();
    event.currentTarget.blur(); // Remove focus from the button
  };

  return (
    <div className="relative flex items-center justify-center bg-[#21293633] p-2 rounded-lg shadow-lg">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-[-8px] right-[-8px] text-white hover:bg-red-transparent"
        onClick={onClose}
        aria-label="Close"
      >
        <XIcon className="h-3 w-3 transform transition-transform duration-200 hover:scale-150" />
      </Button>

      {/* Play/Pause Button */}
      <button className="p-2" onClick={(event) => handleButtonClick(onPlayPause, event)}>
        <Image src="/play_pause.svg" width={600} height={250} alt="Play/Pause" />
      </button>

      {/* Backward Button */}
      <button className="p-2 mx-2" onClick={(event) => handleButtonClick(onBackward, event)}>
        <Image src="/backward.svg" width={300} height={250} alt="Backward" />
      </button>

      {/* Forward Button */}
      <button className="p-2" onClick={(event) => handleButtonClick(onForward, event)}>
        <Image src="/forward.svg" width={300} height={250} alt="Forward" />
      </button>
    </div>
  );
};

export default ControlButtons;
