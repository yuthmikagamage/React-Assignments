import { useState } from "react";
import "./Task_28.css";

const values = [
  { x: 0, y: 0 },
  { x: 30, y: 0 },
  { x: 60, y: 0 },
  { x: 0, y: 30 },
  { x: 30, y: 30 },
  { x: 60, y: 30 },
  { x: 0, y: 60 },
  { x: 30, y: 60 },
  { x: 60, y: 60 },
];

function Task_28() {
  const [activeCircles, setActiveCircles] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (index) => {
    setIsDrawing(true);
    if (!activeCircles.includes(index)) {
      setActiveCircles((prev) => [...prev, index]);
    }
  };

  const handleMouseMove = (index) => {
    if (!isDrawing) return;
    if (!activeCircles.includes(index)) {
      setActiveCircles((prev) => [...prev, index]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setActiveCircles([]);
  };
  return (
    <div className="task-28">
      <div className="task-28-container">
        <div className="pattern">
          <div className="heading">Draw Your Pattern</div>
          <svg
            height={100}
            width={100}
            viewBox="-20 -20 100 100"
            onMouseUp={handleMouseUp}
          >
            {values.map((value, index) => (
              <circle
                key={index}
                className="circle"
                cx={value.x}
                cy={value.y}
                fill="white"
                r={2.5}
                data-active={activeCircles.includes(index)}
                onMouseDown={() => handleMouseDown(index)}
                onMouseMove={() => handleMouseMove(index)}
              ></circle>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Task_28;
