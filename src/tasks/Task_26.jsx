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
  for (let col = 0; col < 4; col++) {
    const columnValues = [];
    for (let row = 0; row < 4; row++) {
      const value = grid[row][col];
      if (columnValues.includes(value)) {
        return false;
      }
      columnValues.push(value);
    }
  }
  // check 2x2 squares
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
  console.log(correctSudoku);
  const grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let blockRow = 0; blockRow < 4; blockRow += 2) {
    for (let blockCol = 0; blockCol < 4; blockCol += 2) {
      const randomRowOffset = Math.floor(Math.random() * 2);
      const randomColOffset = Math.floor(Math.random() * 2);
      const finalRow = blockRow + randomRowOffset;
      const finalCol = blockCol + randomColOffset;

      grid[finalRow][finalCol] = correctSudoku[finalRow][finalCol];
    }
  }

  return grid;
};

function Task_26() {
  const [correctSudoku, setCorrectSudoku] = useState([]);
  const [editedCorrectSudoku, setEditedCorrectSudoku] = useState([]);
  const [fixedCells, setFixedCells] = useState([]);
  const [validationState, setValidationState] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const sudoku = createSudoku();
    setCorrectSudoku(sudoku);

    const edited = createEditedSudoku(sudoku);
    setEditedCorrectSudoku(edited);

    const fixed = edited.map((row) => row.map((cell) => cell !== 0));
    setFixedCells(fixed);

    setValidationState([]);
  };

  const checkSudoku = () => {
    const validation = [];

    for (let row = 0; row < 4; row++) {
      const validationRow = [];
      for (let col = 0; col < 4; col++) {
        const userValue = editedCorrectSudoku[row][col];
        const correctValue = correctSudoku[row][col];
        if (userValue === correctValue) {
          validationRow.push("correct");
        } else {
          validationRow.push("wrong");
        }
      }
      validation.push(validationRow);
    }

    setValidationState(validation);
  };

  const clickNumber = (row, col) => {
    if (fixedCells[row]?.[col]) {
      return;
    }

    setEditedCorrectSudoku((prev) => {
      const newGrid = prev.map((r) => [...r]);
      const currentValue = newGrid[row][col];
      newGrid[row][col] = currentValue === 4 ? 0 : currentValue + 1;
      return newGrid;
    });
  };

  const isCellFixed = (row, col) => {
    return fixedCells[row]?.[col];
  };

  return (
    <div className="task_26">
      <div className="task_26_container">
        {editedCorrectSudoku.map((row, rowIndex) => (
          <div className="gridRow" key={rowIndex}>
            {row.map((cellValue, cellIndex) => (
              <div
                className="gridCellWrapper"
                key={cellIndex}
                onClick={() => clickNumber(rowIndex, cellIndex)}
              >
                <div
                  className={`
                    gridCell
                    ${isCellFixed(rowIndex, cellIndex) ? "fixedCell" : "editableCell"} 
                    ${validationState[rowIndex]?.[cellIndex] || ""}
                  `}
                >
                  {cellValue === 0 ? "" : cellValue}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="task_26_buttons">
        <button onClick={initializeGame}>Reset</button>
        <button onClick={checkSudoku}>Check</button>
      </div>
    </div>
  );
}

export default Task_26;
