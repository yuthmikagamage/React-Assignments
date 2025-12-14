import "./Task_21.css";
import { useState } from "react";

function Task_21() {
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
    <div className="task21">
      {orientations.gamma !== 0 ? (
        <div className="container"></div>
      ) : (
        <div className="button">
          <button onClick={getOrientationValues}>Start Game</button>
        </div>
      )}
    </div>
  );
}
export default Task_21;
