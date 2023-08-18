import ButtonBoard from './ButtonBoard';
import EditModal from './EditModal';
import { motion } from 'framer-motion';
import { MdOutlineCancel } from 'react-icons/md';
import { useState, useEffect } from 'react';

//Shows card containing info on exercises, weights, date, and how many sets and reps per exercise
function WorkoutCard({
  workout,
  expanded,
  startAndStop,
  reset,
  updateCurrentWorkout,
  deleteMode,
  deleteItemFromWorkouts,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [currentBodyWeight, setCurrentBodyWeight] = useState(0);

  useEffect(() => {
    setCurrentBodyWeight(workout.bodyWeight);
  }, []);

  useEffect(() => {
    if (!deleteMode) {
      setConfirmDelete(false);
    }
  }, [deleteMode]);

  //get date info based on id which is actually a time stamp in seconds
  const getNewDate = () => {
    let formattedToday = '';
    if (workout.id) {
      const date = new Date(JSON.parse(workout.id));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      formattedToday = `${month}/${day}/${year}`;
      return formattedToday;
    }
    return formattedToday;
  };

  const handleDeleteClick = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
  };

  return (
    <motion.div className="flex">
      <div
        className="w-full drop-shadow-lg mx-10 mt-6 border-2 border-red-300 rounded-lg"
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0, duration: 1 }}
      >
        <h3 className="px-6 pt-1 text-sm flex justify-between underline">
          <span>{`Workout ${workout.type}`}</span>
          <span>{getNewDate()}</span>
        </h3>
        {confirmDelete ? (
          <div className="flex justify-between mt-4 px-16">
            <button
              onClick={handleCancel}
              className="border rounded-full bg-red-500 text-white px-3 py-1"
            >
              CANCEL
            </button>
            <button
              onClick={() => {
                deleteItemFromWorkouts(workout.id);
                handleCancel();
              }}
              className="border rounded-full bg-red-500 text-white px-3 py-1"
            >
              DELETE
            </button>
          </div>
        ) : (
          <div className="mx-4 pb-2 divide-y divide-solid">
            <div>
              <div className="pt-3 flex justify-between">
                <span className={expanded && 'underline'}>Squat</span>
                <div>
                  <span className="mr-8">5x5</span>
                  {expanded ? (
                    <EditModal
                      workout={workout}
                      updateCurrentWorkout={updateCurrentWorkout}
                      index={0}
                      weight={workout.weights[0]}
                    />
                  ) : workout.weights ? (
                    <span>{`${workout.weights[0]} lb`}</span>
                  ) : null}
                </div>
              </div>
              {expanded && (
                <ButtonBoard
                  index={0}
                  workout={workout}
                  updateCurrentWorkout={updateCurrentWorkout}
                  reset={reset}
                  startAndStop={startAndStop}
                  repsArray={workout.w1}
                />
              )}
            </div>

            <div>
              <div className="pt-3 flex justify-between">
                <span className={expanded && 'underline'}>
                  {workout.type === 'A' ? 'Bench' : 'Overhead Press'}
                </span>
                <div>
                  <span className="mr-8">5x5</span>
                  {expanded ? (
                    <EditModal
                      workout={workout}
                      updateCurrentWorkout={updateCurrentWorkout}
                      index={1}
                      weight={workout.weights[1]}
                    />
                  ) : workout.weights ? (
                    <span>{`${workout.weights[1]} lb`}</span>
                  ) : null}
                </div>
              </div>
              {expanded && (
                <ButtonBoard
                  index={1}
                  workout={workout}
                  updateCurrentWorkout={updateCurrentWorkout}
                  reset={reset}
                  startAndStop={startAndStop}
                  repsArray={workout.w2}
                />
              )}
            </div>

            <div>
              <div className="pt-3 flex justify-between">
                <span className={expanded && 'underline'}>
                  {workout.type === 'A' ? 'BB Row' : 'Deadlift'}
                </span>
                <div>
                  <span className="mr-8">
                    {workout.type === 'A' ? '5x5' : '1x5'}
                  </span>
                  {expanded ? (
                    <EditModal
                      workout={workout}
                      updateCurrentWorkout={updateCurrentWorkout}
                      index={2}
                      weight={workout.weights[2]}
                    />
                  ) : workout.weights ? (
                    <span>{`${workout.weights[2]} lb`}</span>
                  ) : null}
                </div>
              </div>
              {expanded && (
                <ButtonBoard
                  index={2}
                  workout={workout}
                  updateCurrentWorkout={updateCurrentWorkout}
                  reset={reset}
                  startAndStop={startAndStop}
                  repsArray={workout.w3}
                />
              )}
            </div>
            <div className="flex justify-center text-sm pt-2">
              {!expanded ? (
                <span>{`Body Weight: ${workout.bodyWeight}`}</span>
              ) : (
                <span>
                  Body Weight:{' '}
                  <span className=" px-2 py-1 justify-center">
                    <input
                      onChange={(event) => {
                        setCurrentBodyWeight(event.target.value);
                        console.log(event.target.value);
                        updateCurrentWorkout({
                          ...workout,
                          bodyWeight: event.target.value,
                        });
                      }}
                      value={currentBodyWeight}
                      placeholder="#"
                      className="w-8 bg-inherit border-slate-400 border-b-2"
                      type="number"
                    />
                  </span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {deleteMode && (
        <span className="mt-20 mr-2">
          <button
            onClick={handleDeleteClick}
            className={`${
              confirmDelete ? 'text-white' : 'text-red-500'
            } text-3xl`}
          >
            <MdOutlineCancel />
          </button>
        </span>
      )}
    </motion.div>
  );
}

export default WorkoutCard;
