import { useState } from "react";

function Modal({ handleStartButtonClick, isStarted, completeWorkout }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="fixed z-10 inset-x-0 bottom-20 flex justify-center mb-2">
        <button
          className="bg-red-600 text-white active:bg-red-700 py-2 px-6 text-2xl rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          {!isStarted ? "START" : "FINISH"}
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-3 max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    {!isStarted ? "Begin Workout?" : "Finish Workout?"}
                  </h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                      handleStartButtonClick();
                      if (isStarted) {
                        completeWorkout();
                        console.log("working");
                      }
                    }}
                  >
                    {!isStarted ? "Start" : "Finish"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
