import WorkoutCard from "../components/WorkoutCard";
import Stopwatch from "../components/Stopwatch";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

//page for the current workout, displays UI for tracking and editing workout
function WorkoutPage({ workout, updateCurrentWorkout }) {
  const [isRunning, setIsRunning] = useState(false);

  const [time, setTime] = useState(0);

  const [percentage, setPercentage] = useState(0);

  const startAndStop = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
      let newPercentage = time / 180;
      if (newPercentage >= 100) {
        newPercentage = 100;
      }
      setPercentage(newPercentage);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const reset = () => {
    setTime(0);
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, x: window.innerWidth }}
    >
      <WorkoutCard
        updateCurrentWorkout={updateCurrentWorkout}
        reset={reset}
        isRunning={isRunning}
        startAndStop={startAndStop}
        expanded={true}
        workout={workout}
      />
      <Stopwatch percentage={percentage} time={time} isRunning={isRunning} />
    </motion.div>
  );
}

export default WorkoutPage;
