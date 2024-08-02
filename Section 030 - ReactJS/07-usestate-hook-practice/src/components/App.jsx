import React, { useState, useEffect } from "react";

function App() {
  let time = new Date().toLocaleTimeString();
  let [isClockAutoUpdating, setAutoUpdate] = useState(false);
  let [timeState, setTimeState] = useState(time);

  console.log(timeState);

  function updateTime() {
    time = new Date().toLocaleTimeString();
    setTimeState(time);
  }

  function toggleAutoUpdates() {
    setAutoUpdate(!isClockAutoUpdating);
  }

  // thank you ChatGPT!
  useEffect(() => {
    let interval;
    if (isClockAutoUpdating) {
      interval = setInterval(updateTime, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isClockAutoUpdating]);

  return (
    <div className="container">
      <h1>{timeState}</h1>
      <button onClick={updateTime}>Get Time</button>
      <button onClick={toggleAutoUpdates}>
        Auto {isClockAutoUpdating ? "On" : "Off"}
      </button>
    </div>
  );
}

export default App;
