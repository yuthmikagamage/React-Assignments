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
  const [mousePos, setMousePos] = useState(null);

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
  const handleMouseMoveSVG = (e) => {
    if (!isDrawing) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100 - 20;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - 20;

    setMousePos({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setActiveCircles([]);
    setMousePos(null);
  };

  let pathPoints = activeCircles
    .map((index) => `${values[index].x},${values[index].y}`)
    .join(" ");
  if (isDrawing && mousePos && activeCircles.length > 0) {
    pathPoints += ` ${mousePos.x},${mousePos.y}`;
  }

  return (
    <div className="task-28">
      <div className="task-28-container">
        <div className="pattern">
          <div className="heading">Draw Your Pattern</div>
          <svg
            height={100}
            width={100}
            viewBox="-20 -20 100 100"
            onMouseMove={handleMouseMoveSVG}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <polyline
              points={pathPoints}
              fill="none"
              stroke="yellow"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

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
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Task_28;
