function Stopwatch({ time, percentage, isRunning }) {
  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  return (
    <div className="bg-white border-2 mx-6 my-5 rounded-lg pt-2 border-red-500 drop-shadow-lg">
      <div className="flex justify-between p-2">
        <span className="text-2xl">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
        <span className="pr-6 pt-1 text-l">
          {isRunning && "Rest for 3 minutes"}
        </span>
      </div>

      <div className="mb-2 mx-4 rounded-full bg-slate-300">
        <div
          className="bg-red-500 rounded-full p-1"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Stopwatch;
