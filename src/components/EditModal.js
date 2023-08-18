import { useState, useEffect } from "react";

//Modal used for editing weight in the current workout
function EditModal({ weight, updateCurrentWorkout, index, workout }) {
  const [showModal, setShowModal] = useState(false);
  const [currentWeight, setCurentWeight] = useState(45);

  useEffect(() => {
    setCurentWeight(weight);
  }, [weight]);

  //update workout and pass it back up to the home page
  const updateWorkoutObject = (weight, workout) => {
    workout.weights[index] = weight;
    updateCurrentWorkout(workout);
  };

  const increaseWeight = () => {
    let newWeight = currentWeight + 5;
    setCurentWeight(newWeight);
  };

  const decreaseWeight = () => {
    let newWeight = currentWeight - 5;
    if (newWeight < 45) {
      setCurentWeight(45);
    } else {
      setCurentWeight(newWeight);
    }
  };

  //find out how which weights to use ie: how many 45 lb weights to put on each side of the bar etc
  const getWeightBreakdown = (weight) => {
    let remainder = weight - 45;
    remainder = remainder / 2;
    let fortyFives = 0;
    let twentyFives = 0;
    let tens = 0;
    let fives = 0;
    let twoPointFives = 0;
    if (remainder >= 45) {
      fortyFives = Math.floor(remainder / 45);
    }
    remainder = remainder - 45 * fortyFives;
    if (remainder >= 25) {
      twentyFives = Math.floor(remainder / 25);
    }
    remainder = remainder - 25 * twentyFives;
    if (remainder >= 10) {
      tens = Math.floor(remainder / 10);
    }
    remainder = remainder - 10 * tens;
    if (remainder >= 5) {
      fives = Math.floor(remainder / 5);
    }
    remainder = remainder - 5 * fives;
    if (remainder >= 2.5) {
      twoPointFives = Math.floor(remainder / 2.5);
    }
    return (
      <ul>
        <li>{`bar: 45 lb`}</li>
        Per Side:
        {fortyFives !== 0 && <li>{`45 lb weight: ${fortyFives}`}</li>}
        {twentyFives !== 0 && <li>{`25 lb weight: ${twentyFives}`}</li>}
        {tens !== 0 && <li>{`10 lb wight: ${tens}`}</li>}
        {fives !== 0 && <li>{`5 lb weight: ${fives}`}</li>}
        {twoPointFives !== 0 && <li>{`2.5 lb weight: ${twoPointFives}`}</li>}
      </ul>
    );
  };

  return (
    <>
      <span>
        <button
          className="underline text-red-600"
          onClick={() => setShowModal(true)}
        >
          {`${currentWeight} lb`}
        </button>
      </span>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-3 max-w-xl">
              {/*content*/}
              <div className="border-0 border-red-500 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-red-500 rounded-t">
                  <h3 className="text-xl font-semibold">Edit Weight</h3>
                </div>
                {/* message */}
                <div className="p-5">
                  <div>{`Current Weight: ${currentWeight} lb`}</div>
                  <div>{getWeightBreakdown(currentWeight)}</div>
                  <div className="flex justify-between pt-4 px-6">
                    <span>
                      <button
                        onClick={decreaseWeight}
                        className="rounded-full bg-red-500 px-4 py-1 text-white"
                      >
                        - 5
                      </button>
                    </span>
                    <span>
                      <button
                        onClick={increaseWeight}
                        className="rounded-full bg-red-500 px-4 py-1 text-white"
                      >
                        + 5
                      </button>
                    </span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-red-500 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      updateWorkoutObject(currentWeight, workout);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="opacity-40 fixed inset-0 z-40 bg-black"></div> */}
        </>
      ) : null}
    </>
  );
}
export default EditModal;
