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
  const [permissionGranted, setPermissionGranted] = useState(false);

  function handleOrientation(event) {
    setOrientations({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  }

  function getOrientationValues() {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation);
          } else {
            console.error("Device orientation permission denied");
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
      setPermissionGranted(true);
    }
  }

  const lineX = Math.max(-125, Math.min(125, orientations.gamma * 2));

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setBallY((prev) => {
        if (prev >= 135 && prev <= 140) {
          const ballCenterX = 0;
          const distance = Math.abs(ballCenterX - lineX);
          if (distance < 15 + 25) {
            setIsAnimating(false);
            setTimeout(() => {
              setBallY(0);
              setIsAnimating(true);
            }, 100);
            return prev;
          }
        }
        if (prev >= 270) {
          setBallY(0);
          return 0;
        }
        return prev + 3;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isAnimating, lineX]);

  return (
    <div className="task21">
      {permissionGranted ? (
        <div className="container">
          <div
            className="center-line"
            style={{
              transform: `translateX(${lineX}px)`,
            }}
          />
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
