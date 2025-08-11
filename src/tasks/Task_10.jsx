import { useEffect, useRef, useState } from "react";
import "./Task_10.css";
function Task_10() {
  let items = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [snake, setSnake] = useState([
    { x: 3, y: 2 },
    { x: 3, y: 3 },
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 3, y: 6 },
  ]);
  for (let i = 0; i < snake.length; i++) {
    items[snake[i].x][snake[i].y] = 1;
  }

  const intervalRef = useRef(null);

  const snakeDirection = useRef({ x: 0, y: 1 });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: (prev[prev.length - 1].x + snakeDirection.current.x + 10) % 10,
          y: (prev[prev.length - 1].y + snakeDirection.current.y + 10) % 10,
        };
        const newSnake = [...prev.slice(1), newHead];
        return newSnake;
      });
    }, 150);
    return () => clearInterval(intervalRef.current);
  }, [snake]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key == "ArrowDown") {
        snakeDirection.current = { x: 1, y: 0 };
        console.log("ArrowDown Pressed");
      } else if (event.key == "ArrowUp") {
        snakeDirection.current = { x: -1, y: 0 };
        console.log("ArrowUp Pressed");
      } else if (event.key == "ArrowRight") {
        snakeDirection.current = { x: 0, y: 1 };
        console.log("ArrowRight Pressed");
      } else if (event.key == "ArrowLeft") {
        snakeDirection.current = { x: 0, y: -1 };
        console.log("ArrowLeft Pressed");
      } else {
        console.log("Press Arrows Only");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="task10">
      <div className="container">
        <div className="board">
          {items.map((row, rowIndex) => (
            <div className="board-row" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <div className="board-cell" key={cellIndex} value={cell}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Task_10;
