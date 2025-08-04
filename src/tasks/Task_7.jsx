import "./Task_7.css";
import { useState, useEffect, useRef } from "react";

function Task_7() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("DOWN");
  const lastPositionRef = useRef({ x: 0, y: 0 });

  function mouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const deltaX = x - lastPositionRef.current.x;
    const deltaY = y - lastPositionRef.current.y;

    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setDirection(deltaX > 0 ? "RIGHT" : "LEFT");
      } else {
        setDirection(deltaY > 0 ? "DOWN" : "UP");
      }
    }

    lastPositionRef.current = { x, y };
    setPosition({ x, y });
    setAnimating(true);
  }

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [position, animating]);

  return (
    <div className="task7">
      <div className="container" onMouseMove={mouseMove}>
        <div
          className="sprite"
          data-animating={animating}
          data-direction={direction}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      </div>
    </div>
  );
}

export default Task_7;
