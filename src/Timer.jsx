import React, { useEffect, useRef, useState } from "react";
import "./Timer.css";
export default function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [running]);

  return (
    <div className="stopwatch">
      <p className="timer">{format(time)}</p>
      <div className="action">
        <button
          className="btn restart"
          onClick={() => {
            setTime(0);
            setRunning(false);
          }}>
          Restart
        </button>
        <button
          className={`btn ${running ? "stop" : "start"}`}
          onClick={() => {
            setRunning(!running);
          }}>
          {running ? "Stop" : time === 0 ? "Play" : "Resume"}
        </button>
      </div>
    </div>
  );
}

const format = (time) => {
  let hours = Math.floor((time / 60 / 60) % 24);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};
