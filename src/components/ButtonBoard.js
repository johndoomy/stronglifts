import CircleButton from "./CircleButton";
import { useState, useEffect } from "react";

function ButtonBoard({
  repsArray,
  startAndStop,
  reset,
  updateCurrentWorkout,
  index,
  workout,
}) {
  const [workoutArray, setWorkoutArray] = useState([]);

  useEffect(() => {
    setWorkoutArray(repsArray);
  }, [index]);

  const updateWorkoutArrays = (array) => {
    if (index === 0) {
      updateCurrentWorkout({ ...workout, w1: array });
    }
    if (index === 1) {
      updateCurrentWorkout({ ...workout, w2: array });
    }
    if (index === 2) {
      updateCurrentWorkout({ ...workout, w3: array });
    }
  };

  const updateCurrentArray = (number, numberIndex) => {
    const newArray = workoutArray.map((item, index) => {
      if (numberIndex === index) {
        let newItem = number;
        return newItem;
      } else {
        return item;
      }
    });
    console.log(newArray);
    setWorkoutArray(newArray);
    updateWorkoutArrays(newArray);
  };

  return (
    <div className="flex justify-between mx-4 my-6">
      {repsArray &&
        repsArray.map((number, index) => (
          <CircleButton
            updateCurrentArray={updateCurrentArray}
            updateCurrentWorkout={updateCurrentWorkout}
            reset={reset}
            startAndStop={startAndStop}
            key={index}
            index={index}
            number={number}
          />
        ))}
    </div>
  );
}

export default ButtonBoard;
