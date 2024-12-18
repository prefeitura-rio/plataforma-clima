import Image from 'next/image';
import React from 'react';

interface ControlButtonsProps {
  onPlayPause: () => void;
  onBackward: () => void;
  onForward: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onPlayPause,
  onBackward,
  onForward,
}) => {
  const handleButtonClick = (callback: () => void, event: React.MouseEvent<HTMLButtonElement>) => {
    callback();
    event.currentTarget.blur(); // Remove focus from the button
  };

  return (
    <div className="flex items-center justify-center bg-[#21293633] p-2 rounded-lg shadow-lg">
      <button className="p-2" onClick={(event) => handleButtonClick(onPlayPause, event)}>
        <Image src="/play_pause.svg" width={600} height={250} alt="Play/Pause" />
      </button>

      <button className="p-2 mx-2" onClick={(event) => handleButtonClick(onBackward, event)}>
        <Image src="/backward.svg" width={300} height={250} alt="Backward" />
      </button>

      <button className="p-2" onClick={(event) => handleButtonClick(onForward, event)}>
        <Image src="/forward.svg" width={300} height={250} alt="Forward" />
      </button>
    </div>
  );
};

export default ControlButtons;
