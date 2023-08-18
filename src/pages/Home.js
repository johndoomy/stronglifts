import WorkoutCard from "../components/WorkoutCard";
import { useEffect, useState } from "react";
import WorkoutPage from "./WorkoutPage";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import SkeletonLoaderCard from "../components/SkeletonLoaderCard";

//home page containg today's workout card, option to switch workout to A/B, and start button to start the exercise
function Home({ workouts, addWorkout, loading }) {
  //state for which button is active, also helps to modify current current workout card
  const [selectedWorkout, setSelectedWorkout] = useState(true);

  //current workout, maybe change default state?
  const [currentWorkout, setCurrentWorkout] = useState({
    id: JSON.stringify("loading"),
    type: "A",
    weights: [0, 0, 0],
    time: 0,
    w1: [0, 0, 0, 0, 0],
    w2: [0, 0, 0, 0, 0],
    w3: [0, 0, 0, 0, 0],
  });

  // state for starting workout and switching between default page and workout page
  const [isStarted, setIsStarted] = useState(false);

  //function to pass down to components to update the workout when changes/edits are made
  const updateCurrentWorkout = (workout) => {
    setCurrentWorkout(workout);
  };

  //variables for tailwind css for button styling
  const selectedButton =
    "px-3 py-1 bg-red-700 text-white rounded-full cursor-pointer";
  const unselectedButton =
    "drop-shadow-lg px-3 py-1 bg-red-500 text-white rounded-full cursor-pointer";

  //reverse workouts array to easily find last A & B workouts
  const reversedWorkouts = workouts
    .slice(0)
    .reverse()
    .map((item) => item);

  const lastWorkout = reversedWorkouts[0];

  //function finds penultimate workout from the last workout (if last workout was type A, it will search for the last B workout and vice versa)
  const findPenultimateWorkout = (previousWorkout) => {
    if (previousWorkout !== undefined) {
      if (previousWorkout.type === "A") {
        const penultimateWorkout = reversedWorkouts.find(
          (item) => item.type === "B"
        );
        return penultimateWorkout;
      } else {
        const penultimateWorkout = reversedWorkouts.find(
          (item) => item.type === "A"
        );
        return penultimateWorkout;
      }
    } else {
      return;
    }
  };

  const penultimateWorkout = findPenultimateWorkout(lastWorkout);

  //function takes previous workout and increments the weight for the current workout, also has logic for if there was failure in not doing enough reps in workout
  const incrementWorkout = (previousWorkout) => {
    let newWorkout = {};
    if (previousWorkout === undefined) {
      newWorkout.weights = [45, 45, 45];
      newWorkout.type = "A";
      setSelectedWorkout(true);
    } else {
      newWorkout.type = previousWorkout.type;
      setSelectedWorkout(newWorkout.type === "A");
      newWorkout.weights = previousWorkout.weights.map((weight, index) => {
        //logic for deciding how to increment weights based on performance of last round of exercises
        if (previousWorkout.type === "B" && index === 2) {
          if (
            previousWorkout.w3.reduce((partialSum, a) => partialSum + a, 0) >= 3
          ) {
            return weight + 10;
          } else {
            return weight;
          }
        } else if (index === 1) {
          if (
            previousWorkout.w2.reduce((partialSum, a) => partialSum + a, 0) >=
            21
          ) {
            return weight + 5;
          } else {
            return weight;
          }
        } else {
          if (
            previousWorkout.w1.reduce((partialSum, a) => partialSum + a, 0) >=
            21
          ) {
            return weight + 10;
          } else {
            return weight;
          }
        }
      });
    }
    newWorkout.id = JSON.stringify(new Date().getTime());
    newWorkout.time = 0;
    newWorkout.w1 = [-1, -1, -1, -1, -1];
    newWorkout.w2 = [-1, -1, -1, -1, -1];
    if (newWorkout.type === "B") {
      newWorkout.w3 = [-1];
    } else {
      newWorkout.w3 = [-1, -1, -1, -1, -1];
    }
    if (previousWorkout) {
      newWorkout.bodyWeight = previousWorkout.bodyWeight;
    } else {
      newWorkout.bodyWeight = 0;
    }
    setCurrentWorkout(newWorkout);
  };

  //get the current workout when workouts is updated, basically for when axios returns data
  useEffect(() => {
    incrementWorkout(penultimateWorkout);
  }, [workouts]);

  //set the type for the workout
  const setWorkoutType = (workout, type) => {
    workout.type = type;
  };

  //when workout button is clicked, it changes which button is selected, as well as updating the current workout card to display correct workout
  const handleWorkoutButtonClick = (event) => {
    if (event.target.innerHTML === "Workout A") {
      setSelectedWorkout(true);
      setWorkoutType(currentWorkout, "A");
      if (penultimateWorkout.type === "A") {
        incrementWorkout(penultimateWorkout);
      } else {
        incrementWorkout(lastWorkout);
      }
    } else {
      setSelectedWorkout(false);
      setWorkoutType(currentWorkout, "B");

      if (penultimateWorkout.type === "B") {
        incrementWorkout(penultimateWorkout);
      } else {
        incrementWorkout(lastWorkout);
      }
    }
  };

  const handleStartButtonClick = () => {
    setIsStarted(!isStarted);
  };

  const completeWorkout = () => {
    addWorkout(currentWorkout);
  };

  return (
    <div className="mb-40 pt-16">
      <Modal
        handleStartButtonClick={handleStartButtonClick}
        isStarted={isStarted}
        completeWorkout={completeWorkout}
      />
      {!isStarted && (
        <motion.div
          className=""
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          exit={{ opacity: 0, x: window.innerWidth }}
        >
          <h2 className="mt-8 font-bold flex ml-6 underline">
            Today's Workout
          </h2>

          <div className="flex justify-between mx-16 mt-4">
            <span
              onClick={(event) => handleWorkoutButtonClick(event)}
              className={selectedWorkout ? selectedButton : unselectedButton}
            >
              Workout A
            </span>
            <span
              onClick={(event) => handleWorkoutButtonClick(event)}
              className={selectedWorkout ? unselectedButton : selectedButton}
            >
              Workout B
            </span>
          </div>

          {loading ? (
            <SkeletonLoaderCard />
          ) : (
            <WorkoutCard expandable={false} workout={currentWorkout} />
          )}

          <div>
            <h2 className="mt-8 font-bold flex ml-6 underline">
              Previous Workouts
            </h2>
            {lastWorkout ? (
              <WorkoutCard expandable={false} workout={lastWorkout} />
            ) : (
              <SkeletonLoaderCard />
            )}
            {penultimateWorkout ? (
              <WorkoutCard expandable={false} workout={penultimateWorkout} />
            ) : (
              <SkeletonLoaderCard />
            )}
          </div>
        </motion.div>
      )}
      {isStarted && (
        <WorkoutPage
          workout={currentWorkout}
          updateCurrentWorkout={updateCurrentWorkout}
        />
      )}
    </div>
  );
}

export default Home;
