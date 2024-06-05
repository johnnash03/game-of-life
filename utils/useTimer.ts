"use client";
import { useEffect, useState } from "react";
const useTimer = () => {
  const [passedSeconds, setPassedSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [prevTime, setPrevTime] = useState(new Date().getTime());
  const [isRunning, setIsRunning] = useState(true);
  function getTimeDiff(prevTime: number) {
    return Math.round((new Date().getTime() - prevTime) / 1000);
  }
  function getTimeFromSeconds(secs: number) {
    const totalSeconds = Math.ceil(secs);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      totalSeconds,
      seconds,
      minutes,
      hours,
      days,
    };
  }
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setSeconds(passedSeconds + getTimeDiff(prevTime));
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [prevTime, isRunning, passedSeconds]);
  function pause() {
    setIsRunning(false);
    setPassedSeconds(seconds);
  }
  function play() {
    setPrevTime(new Date().getTime());

    setIsRunning(true);
    setSeconds(passedSeconds);
  }
  const { seconds: secs, minutes, hours } = getTimeFromSeconds(seconds);
  return {
    secs,
    minutes,
    hours,
    play,
    pause,
    isRunning,
  };
};

export default useTimer;
