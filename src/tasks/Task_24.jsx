import { useEffect, useState } from "react";
import "./Task_24.css";

function Task_24() {
  const colors = [
    "rgb(51, 153, 255)",
    "rgb(255, 51, 51)",
    "rgb(0, 204, 102)",
    "rgb(153, 51, 51)",
    "rgb(153, 51, 255)",
    "rgb(255, 153, 51)",
  ];
  const [bottles, setBottles] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  function initializeGame() {
    let colorPool = [];
    colors.forEach((color) => {
      for (let i = 1; i <= 4; i++) {
        colorPool.push(color);
      }
    });

    colorPool.sort(() => Math.random() - 0.5);
    const newBottles = [];
    for (let i = 1; i <= 8; i++) {
      newBottles.push(colorPool.splice(0, 3));
    }
    setBottles(newBottles);
  }

  function clickBottle(bottleId) {
    console.log("Clicked", bottleId);
  }

  return (
    <div className="task-24">
      <div className="task-24-container">
        {bottles.map((bottle, bottleId) => (
          <div
            key={bottleId}
            className="bottle"
            onClick={() => clickBottle(bottleId)}
          >
            {bottle.map((color, colorID) => (
              <div
                key={colorID}
                className="liquid"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Task_24;
