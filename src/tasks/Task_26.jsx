import "./Task_26.css";
function Task_26() {
  console.log("Task_26");
  const exampleValidGrid = [
    [2, 1, 4, 3],
    [3, 4, 1, 2],
    [1, 3, 2, 4],
    [4, 2, 3, 1],
  ];
  const exampleInvalidGrid = [
    [2, 1, 3, 4],
    [3, 4, 1, 2],
    [1, 3, 2, 4],
    [4, 2, 3, 1],
  ];

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

  // create randomized grids
  const grid_1 = createRandomGrid();
  const grid_2 = createRandomGrid();
  // validating randomized grids
  const validation_1 = validateGrid(grid_1);
  const validation_2 = validateGrid(grid_2);

  // mostly will return false since just two random grids
  console.log("validation_1", validation_1);
  console.log("validation_2", validation_2);

  // validating given example grids
  const validation_3 = validateGrid(exampleValidGrid);
  const validation_4 = validateGrid(exampleInvalidGrid);

  // should display true
  console.log("validation_3", validation_3);
  // should display false
  console.log("validation_4", validation_4);

  return (
    <div className="Task_26">
      <h1>Task_26</h1>
    </div>
  );
}
export default Task_26;
