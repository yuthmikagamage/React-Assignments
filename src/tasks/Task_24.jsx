import { useEffect, useState } from "react";
import "./Task_24.css";

const COLORS = [
  "rgb(51, 153, 255)",
  "rgb(255, 51, 51)",
  "rgb(0, 204, 102)",
  "rgb(153, 51, 51)",
  "rgb(153, 51, 255)",
  "rgb(255, 153, 51)",
];

const BOTTLE_CAPACITY = 4;
const INITIAL_FILL = 3;
const TOTAL_BOTTLES = 8;

function Task_24() {
  const [bottles, setBottles] = useState([]);
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    checkWinCondition();
  }, [bottles]);

  function initializeGame() {
    let colorPool = [];

    COLORS.forEach((color) => {
      for (let i = 0; i < BOTTLE_CAPACITY; i++) {
        colorPool.push(color);
      }
    });

    colorPool.sort(() => Math.random() - 0.5);

    const newBottles = [];
    for (let i = 0; i < TOTAL_BOTTLES; i++) {
      newBottles.push(colorPool.splice(0, INITIAL_FILL));
    }

    setBottles(newBottles);
    setSelectedBottle(null);
    setIsWon(false);
  }

  function getTopColor(bottle) {
    return bottle.length === 0 ? null : bottle[bottle.length - 1];
  }

  function canTransfer(fromBottle, toBottle) {
    if (fromBottle.length === 0) return false;
    if (toBottle.length >= BOTTLE_CAPACITY) return false;
    if (toBottle.length === 0) return true;
    return getTopColor(fromBottle) === getTopColor(toBottle);
  }

  function transferLiquid(fromIndex, toIndex) {
    const newBottles = bottles.map((b) => [...b]);
    const fromBottle = newBottles[fromIndex];
    const toBottle = newBottles[toIndex];

    if (!canTransfer(fromBottle, toBottle)) return;

    const movingColor = getTopColor(fromBottle);

    while (
      fromBottle.length &&
      getTopColor(fromBottle) === movingColor &&
      toBottle.length < BOTTLE_CAPACITY
    ) {
      toBottle.push(fromBottle.pop());
    }

    setBottles(newBottles);
  }

  function clickBottle(bottleId) {
    if (isWon) return;

    if (selectedBottle === null) {
      if (bottles[bottleId].length > 0) {
        setSelectedBottle(bottleId);
      }
      return;
    }

    if (selectedBottle === bottleId) {
      setSelectedBottle(null);
      return;
    }

    transferLiquid(selectedBottle, bottleId);
    setSelectedBottle(null);
  }

  function checkWinCondition() {
    if (bottles.length === 0) return;

    const won = bottles.every((bottle) => {
      if (bottle.length === 0) return true;
      if (bottle.length !== BOTTLE_CAPACITY) return false;

      const firstColor = bottle[0];
      return bottle.every((color) => color === firstColor);
    });

    setIsWon(won);
  }

  return (
    <div className="task-24">
      <div className="task-24-container">
        <h2 className="title">Water Sort Puzzle</h2>

        {isWon && (
          <div className="win-message">
            🎉 Congratulations! You solved the puzzle!
          </div>
        )}

        <div className="bottle-grid">
          {bottles.map((bottle, bottleId) => (
            <div
              key={bottleId}
              className={`bottle ${
                selectedBottle === bottleId ? "selected" : ""
              }`}
              onClick={() => clickBottle(bottleId)}
            >
              {bottle.map((color, colorID) => (
                <div
                  key={colorID}
                  className="liquid"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ))}
        </div>

        <button className="reset-btn" onClick={initializeGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default Task_24;
