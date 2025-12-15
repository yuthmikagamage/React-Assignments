import "./Task_21.css";
import { useEffect, useState } from "react";

function Task_21() {
  const [orientations, setOrientations] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [ballY, setBallY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

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

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setBallY((prev) => {
        if (prev >= 270) {
          setIsAnimating(false);
          setTimeout(() => {
            setBallY(0);
            setIsAnimating(true);
          }, 100);
          return prev;
        }
        return prev + 3;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="task21">
      {orientations.gamma !== 0 ? (
        <div className="container">
          <div
            className="ball"
            style={{
              transform: `translateY(${ballY}px)`,
            }}
          />
        </div>
      ) : (
        <div className="button">
          <button onClick={getOrientationValues}>Start Game</button>
        </div>
      )}
    </div>
  );
}
export default Task_21;
