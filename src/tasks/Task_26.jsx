import { useEffect, useState } from "react";
import "./Task_26.css";
const createRandomRow = () => {
  return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
};

const createRandomGrid = () => {
  const grid = [];
  for (let i = 0; i < 4; i++) {
    grid.push(createRandomRow());
  }
  return grid;
};

const validateGrid = (grid) => {
  // check: should not repeat same digit in a single column
  for (let col = 0; col < 4; col++) {
    const columnValues = [];
    for (let colDown = 0; colDown < 4; colDown++) {
      const value = grid[colDown][col];
      if (columnValues.includes(value)) {
        return false;
      }
      columnValues.push(value);
    }
  }
  // check: should not repeat same digit in a 2 x 2 grid
  for (let row = 0; row < 4; row += 2) {
    for (let col = 0; col < 4; col += 2) {
      const values = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const value = grid[row + i][col + j];
          if (values.includes(value)) {
            return false;
          }
          values.push(value);
        }
      }
    }
  }
  return true;
};
const createSudoku = () => {
  let valid = false;
  let grid = [];
  while (!valid) {
    grid = createRandomGrid();
    valid = validateGrid(grid);
  }
  return grid;
};

const createEditedSudoku = (correctSudoku) => {
  console.log("Correct Sudoku ", correctSudoku);
  let grid = [];
  for (let row = 0; row < 4; row++) {
    let currentRow = [];
    if (row % 2 !== 0) {
      currentRow = [" ", " ", " ", " "];
    } else {
      for (let item = 0; item < 4; item += 2) {
        currentRow.push(correctSudoku[row][item]);
        currentRow.push(" ");
      }
    }
    grid.push(currentRow);
  }
  return grid;
};

const checkSudoku = () => {};

function Task_26() {
  const [correctSudoku, setCorrectSudoku] = useState([]);
  const [editedCorrectSudoku, setEditedCorrectSudoku] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const getSudoku = createSudoku();
    setCorrectSudoku(getSudoku);
    const emptySudoku = createEditedSudoku(getSudoku);
    setEditedCorrectSudoku(emptySudoku);
  };

  return (
    <div className="task_26">
      <div className="task_26_numbers">
        {[1, 2, 3, 4].map((number, key) => (
          <div
            className={`dragNumber ${selectedNumber === number ? "selected" : ""}`}
            key={key}
            onClick={() => setSelectedNumber(number)}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="task_26_container">
        {editedCorrectSudoku.map((row, rowIndex) => (
          <div className="gridRow" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className="gridCell" key={cellIndex}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="task_26_buttons">
        {" "}
        <button onClick={initializeGame}>Reset</button>
        <button>Check</button>
      </div>
    </div>
  );
}
export default Task_26;
