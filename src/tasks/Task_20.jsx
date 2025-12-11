import { useState } from "react";
import "./Task_20.css";

function Task_20() {
  const [orientations, setOrientations] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  function handleOrientation(event) {
    setOrientations({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  }

  function getOrientationValues() {
    window.addEventListener("deviceorientation", handleOrientation);
  }

  return (
    <div className="task20">
      {orientations.alpha == 0 ? (
        <button onClick={getOrientationValues}>Get Orientation Values</button>
      ) : (
        <div>
          <h2>Alpha : {orientations.alpha}°</h2>
          <h2>Beta : {orientations.beta}°</h2>
          <h2>Gamma : {orientations.gamma}°</h2>
        </div>
      )}
    </div>
  );
}

export default Task_20;
