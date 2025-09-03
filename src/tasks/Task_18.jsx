import { useEffect, useRef } from "react";
import "./Task_18.css";
function Task_18() {
  const canvasRef = useRef();
  const movingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function handleMouseDown() {
    console.log("Mouse Down");
    movingRef.current = true;
  }
  function handleMouseUp() {
    console.log("Mouse Up");
    movingRef.current = false;
  }
  function handleMouseMove() {
    if (movingRef.current) {
      console.log("Mouse Moving");
    } else {
      console.log("Error");
    }
  }
  return (
    <div className="task18">
      <div className="container">
        <canvas
          ref={canvasRef}
          onMouseDown={() => handleMouseDown()}
          onMouseMove={() => handleMouseMove()}
          onMouseUp={() => handleMouseUp()}
        ></canvas>
      </div>
    </div>
  );
}
export default Task_18;
