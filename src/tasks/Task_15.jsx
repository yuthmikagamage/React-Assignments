import { useState, useEffect } from "react";
import "./Task_15.css";

function Task_15() {
  const [puzzle, setPuzzle] = useState([]);
  const [emptyPos, setEmptyPos] = useState({ row: 2, col: 2 });

  useEffect(() => {
    initializePuzzle();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          movePiece("up");
          break;
        case "ArrowDown":
          event.preventDefault();
          movePiece("down");
          break;
        case "ArrowLeft":
          event.preventDefault();
          movePiece("left");
          break;
        case "ArrowRight":
          event.preventDefault();
          movePiece("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [puzzle, emptyPos]);

  const initializePuzzle = () => {
    const elements = [];

    for (let i = 0; i < 3; i++) {
      const rowArray = [];
      for (let v = 0; v < 3; v++) {
        if (i == 2 && v == 2) {
          rowArray.push(null);
        } else {
          rowArray.push({
            row: i,
            col: v,
            backgroundPosition: `-${v * 100}px -${i * 100}px`,
          });
        }
      }
      elements.push(rowArray);
    }

    const flatElements = elements.flat();

    for (let i = flatElements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatElements[i], flatElements[j]] = [flatElements[j], flatElements[i]];
    }

    const shuffleElements = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let v = 0; v < 3; v++) {
        row.push(flatElements[i * 3 + v]);
      }
      shuffleElements.push(row);
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (shuffleElements[row][col] === null) {
          setEmptyPos({ row, col });
          break;
        }
      }
    }

    setPuzzle(shuffleElements);
  };

  const movePiece = (direction) => {
    const newPuzzle = puzzle.map((row) => [...row]);
    let newEmptyPos = { ...emptyPos };
    let targetRow = emptyPos.row;
    let targetCol = emptyPos.col;

    switch (direction) {
      case "up":
        targetRow = emptyPos.row + 1;
        break;
      case "down":
        targetRow = emptyPos.row - 1;
        break;
      case "left":
        targetCol = emptyPos.col + 1;
        break;
      case "right":
        targetCol = emptyPos.col - 1;
        break;
    }

    if (targetRow >= 0 && targetRow < 3 && targetCol >= 0 && targetCol < 3) {
      newPuzzle[emptyPos.row][emptyPos.col] = newPuzzle[targetRow][targetCol];
      newPuzzle[targetRow][targetCol] = null;
      newEmptyPos = { row: targetRow, col: targetCol };
      setPuzzle(newPuzzle);
      setEmptyPos(newEmptyPos);
    }
  };

  return (
    <div className="task15">
      <div className="container">
        <div className="hint">Use Arrow Keys to Move Puzzle</div>
        <div className="puzzle">
          {puzzle.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={piece ? "cropImg" : "cropImg empty"}
                  style={{
                    backgroundPosition: piece
                      ? piece.backgroundPosition
                      : "none",
                    visibility: piece ? "visible" : "hidden",
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <button className="restart-btn" onClick={initializePuzzle}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Task_15;
