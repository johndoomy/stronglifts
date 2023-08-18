import WorkoutCard from '../components/WorkoutCard';
import { BiChevronDown } from 'react-icons/bi';
import { motion, useAnimate } from 'framer-motion';
import { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

function History({ workouts, deleteItemFromWorkouts }) {
  const [currentWorkouts, setCurrentWorkouts] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(true);

  const [deleteMode, setDeleteMode] = useState(false);

  const [scope, animate] = useAnimate();

  const [scope1, animate1] = useAnimate();

  useEffect(() => {
    const reversedWorkouts = workouts
      .slice(0)
      .reverse()
      .map((item) => item);
    setCurrentWorkouts(reversedWorkouts);
  }, [workouts]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      animate(scope.current, { rotate: 180 });
    } else {
      animate(scope.current, { rotate: 0 });
    }
  };

  const handleEditClick = () => {
    setDeleteMode(!deleteMode);
    if (!deleteMode) {
      animate1(scope1.current, { x: -24 });
    } else {
      animate1(scope1.current, { x: 0 });
    }
  };

  const sortIncreasingOrder = () => {
    setCurrentWorkouts(workouts);
    setSelectedOrder(false);
  };

  const sortDecreasingOrder = () => {
    const reversedWorkouts = workouts
      .slice(0)
      .reverse()
      .map((item) => item);
    setCurrentWorkouts(reversedWorkouts);
    setSelectedOrder(true);
  };

  return (
    <motion.div
      className="mt-24 mb-20"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%' }}
      exit={{ opacity: 0, x: window.innerWidth }}
    >
      <h1 className="justify-center flex text-2xl">History</h1>
      <div className="flex justify-between text-md mx-6 mt-6">
        <OutsideClickHandler
          onOutsideClick={() => {
            showDropdown && handleClick();
          }}
        >
          <div className="relative flex">
            <button
              onClick={handleClick}
              className="bg-red-500 rounded-lg text-white py-1 pl-4 pr-3 flex hover:bg-red-600 focus:bg-red-600"
            >
              <span>Sort</span>
              <span ref={scope} className={`text-2xl ml-1`}>
                <BiChevronDown />
              </span>
            </button>

            <div
              className={` absolute bg-gray-100 z-20 rounded-md text-black mt-8  ${
                showDropdown ? 'block' : 'hidden'
              }`}
            >
              <button
                onClick={() => {
                  handleClick();
                  sortIncreasingOrder();
                }}
                className={`rounded-md py-2 w-40 px-4 hover:bg-gray-300 ${
                  !selectedOrder && 'bg-gray-200'
                }`}
              >
                Oldest to newest
              </button>
              <button
                onClick={() => {
                  handleClick();
                  sortDecreasingOrder();
                }}
                className={`rounded-md py-2 w-40 px-4 hover:bg-gray-300 ${
                  selectedOrder && 'bg-gray-200'
                }`}
              >
                Newest to oldest
              </button>
            </div>
          </div>
        </OutsideClickHandler>

        <button onClick={handleEditClick} className="text-red-600 underline">
          Edit
        </button>
      </div>
      <div ref={scope1}>
        {currentWorkouts &&
          currentWorkouts.map((workout, index) => (
            <WorkoutCard
              deleteItemFromWorkouts={deleteItemFromWorkouts}
              deleteMode={deleteMode}
              key={index}
              workout={workout}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default History;
