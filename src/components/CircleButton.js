import {
  RiNumber0,
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
} from "react-icons/ri";
import { useState, useEffect } from "react";

function CircleButton({
  number,
  startAndStop,
  reset,
  updateCurrentArray,
  index,
}) {
  const [displayedNumber, setDisplayedNumber] = useState(-1);

  useEffect(() => {
    setDisplayedNumber(number);
  }, [number]);

  const handleClick = () => {
    let nextNumber = displayedNumber - 1;
    if (nextNumber < -1) {
      nextNumber = 5;
    }
    setDisplayedNumber(nextNumber);
    updateCurrentArray(nextNumber, index);
    reset();
    startAndStop();
  };

  const defaultCSS =
    "hover:cursor-pointer p-3 text-gray-400 rounded-full bg-red-700";
  const clickedCSS =
    "hover:cursor-pointer drop-shadow-md p-3 text-white rounded-full bg-red-500";

  const findIcon = (number) => {
    if (number === 0) {
      return <RiNumber0 />;
    } else if (number === 1) {
      return <RiNumber1 />;
    } else if (number === 2) {
      return <RiNumber2 />;
    } else if (number === 3) {
      return <RiNumber3 />;
    } else if (number === 4) {
      return <RiNumber4 />;
    } else if (number === 5) {
      return <RiNumber5 />;
    } else {
      return <RiNumber5 />;
    }
  };

  return (
    <span
      onClick={handleClick}
      className={displayedNumber === -1 ? defaultCSS : clickedCSS}
    >
      {findIcon(displayedNumber)}
    </span>
  );
}

export default CircleButton;
