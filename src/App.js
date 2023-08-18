import './index.css';
import Home from './pages/Home.js';
import History from './pages/History';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Stats from './pages/Stats';
import Tips from './pages/Tips';
import Settings from './pages/Settings';
import { ImStatsDots } from 'react-icons/im';
import { AiFillHome, AiOutlineHistory, AiOutlineSetting } from 'react-icons/ai';
import { HiOutlineLightBulb } from 'react-icons/hi';

function App() {
  //state for array of all workouts
  const [workouts, setWorkouts] = useState([]);

  const [page, setPage] = useState('home');

  const [loading, setLoading] = useState(true);

  const addWorkout = (workout) => {
    const newWorkouts = [...workouts, workout];
    setWorkouts(newWorkouts);
    putData(workout);
    console.log(workout);
  };

  //get workouts on page load
  useEffect(() => {
    getData();
  }, []);

  //get all workouts from DB
  const getData = async () => {
    try {
      const response = await axios.get(
        'https://t51304ji5h.execute-api.us-west-2.amazonaws.com/items',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      setWorkouts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //get specific workout by id
  const getItem = async (id) => {
    try {
      const response = await axios.get(
        `https://t51304ji5h.execute-api.us-west-2.amazonaws.com/items/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //delete workout by id
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `https://t51304ji5h.execute-api.us-west-2.amazonaws.com/items/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItemFromWorkouts = (id) => {
    const newWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(newWorkouts);
    console.log(newWorkouts);
    deleteItem(id);
  };

  //add workout entry to DB
  const putData = async (data) => {
    try {
      const response = await axios.put(
        'https://t51304ji5h.execute-api.us-west-2.amazonaws.com/items',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHomeClick = () => {
    setPage('home');
  };

  const handleHistoryClick = () => {
    setPage('history');
  };

  const handleStatsClick = () => {
    setPage('stats');
  };

  const handleTipsClick = () => {
    setPage('tips');
  };

  const handleSettingsClick = () => {
    setPage('settings');
  };

  const selectedPageCSS =
    'rounded-full  cursor-pointer text-white bg-red-700 hover:bg-red-700 p-4';
  const unselectedPageCSS =
    'rounded-full cursor-pointer text-white bg-red-600 hover:bg-red-700 p-4';

  return (
    <div className="overflow-x-hidden">
      <h1 className="bg-red-600 text-4xl text-white justify-center flex py-3 fixed top-0 w-full z-10">
        StrongLifts
      </h1>

      {page === 'home' && (
        <Home loading={loading} addWorkout={addWorkout} workouts={workouts} />
      )}
      {page === 'history' && (
        <History
          deleteItemFromWorkouts={deleteItemFromWorkouts}
          workouts={workouts}
        />
      )}
      {page === 'stats' && <Stats />}
      {page === 'tips' && <Tips />}
      {page === 'settings' && <Settings />}

      <div className="fixed inset-x-0 bottom-0 ">
        {/* navbar */}
        <div className=" flex justify-between bg-red-600 p-1">
          <button
            onClick={handleHomeClick}
            className={page === 'home' ? selectedPageCSS : unselectedPageCSS}
          >
            <AiFillHome className="text-2xl" />
          </button>
          <button
            onClick={handleHistoryClick}
            className={page === 'history' ? selectedPageCSS : unselectedPageCSS}
          >
            <AiOutlineHistory className="text-2xl" />
          </button>
          <button
            onClick={handleStatsClick}
            className={page === 'stats' ? selectedPageCSS : unselectedPageCSS}
          >
            <ImStatsDots className="text-2xl" />
          </button>
          <button
            onClick={handleTipsClick}
            className={page === 'tips' ? selectedPageCSS : unselectedPageCSS}
          >
            <HiOutlineLightBulb className="text-2xl" />
          </button>
          <button
            onClick={handleSettingsClick}
            className={
              page === 'settings' ? selectedPageCSS : unselectedPageCSS
            }
          >
            <AiOutlineSetting className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
