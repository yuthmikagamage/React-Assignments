import { useState, useEffect } from "react";
import "./Task_7.css";

function Task_7() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);

  function mouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
          className={`object ${animating ? "moving" : ""}`}
          style={{
            transform: `translate(${position.x - 25}px, ${position.y - 25}px)`,
          }}
        >
          <img
            src={
              animating
                ? "public/cursor-sprite-animation-active.gif"
                : "public/cursor-sprite-animation-inactive.png"
            }
            alt="cursor"
            className="cursor-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Task_7;
