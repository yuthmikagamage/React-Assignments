import { useEffect, useState } from "react";
import "./Task_1.css";

function Task_1() {
  const [position, setPosition] = useState([]);

  function mouseMove(event) {
    const newPosition = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now,
    };

    setPosition((prev) => [...prev, newPosition]);
  }

  // function mouseMove(event) {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   const newPosition = {
  //     x: event.clientX - rect.left,
  //     y: event.clientY - rect.top,
  //     time: Date.now(),
  //   };
  //   setPosition((prev) => [...prev, newPosition]);
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPosition((prev) => prev.filter((pos) => now - pos.time < 3000));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="task1">
      <div className="container" onMouseMove={mouseMove}>
        {position.map((positions, key) => (
          <div
            key={key}
            className="bubble"
            style={{ top: positions.y, left: positions.x }}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default Task_1;
