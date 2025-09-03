import { useEffect, useRef, useState } from "react";
import "./Task_18.css";

function Task_18() {
  const canvasRef = useRef();
  const movingRef = useRef(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5);

  const colors = [
    "red",
    "green",
    "blue",
    "black",
    "pink",
    "brown",
    "orange",
    "purple",
    "gray",
    "coral",
    "indigo",
    "turquoise",
    "khaki",
    "orchid",
    "slateblue",
    "gold",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 550;
    canvas.height = 500;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function handleMouseDown(e) {
    movingRef.current = true;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
    ctx.fillStyle = selectedColor;
    ctx.fill();
  }

  function handleMouseUp() {
    movingRef.current = false;
  }

  function handleMouseMove(e) {
    if (movingRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
      ctx.fillStyle = selectedColor;
      ctx.fill();
    }
  }

  return (
    <div className="task18">
      <div className="container">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
        <div className="bottom">
          {colors.map((color, index) => (
            <button
              style={{ backgroundColor: color }}
              className="colorSelect"
              key={index}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
        <input
          type="range"
          className="rangeSelect"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Task_18;
