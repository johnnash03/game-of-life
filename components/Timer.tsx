"use client";

import useTimer from "./useTimer";
const Timer = ({ onStop, timeAlreadySpent }) => {
  console.log("timeAlreadySpent", timeAlreadySpent);
  const { totalSeconds, secs, minutes, hours, play, pause, isRunning } =
    useTimer(timeAlreadySpent);

  function handleStop(isComplete: boolean) {
    console.log("totalSecons", totalSeconds);
    onStop(isComplete, Math.floor(totalSeconds / 60));
  }
  return (
    <div className="p-4">
      <div className="flex justify-center py-32">
        <span className="countdown font-mono text-2xl">
          <span style={{ "--value": hours }}></span>:
          <span style={{ "--value": minutes }}></span>:
          <span style={{ "--value": secs }}></span>
        </span>
      </div>
      <div className="flex justify-between">
        <button className="btn btn-error" onClick={() => handleStop(false)}>
          Leave
        </button>
        <button className="btn btn-success" onClick={() => handleStop(true)}>
          Complete
        </button>
      </div>
    </div>
  );
};
export default Timer;
