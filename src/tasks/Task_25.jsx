import { useEffect, useState } from "react";
import "./Task_25.css";

function Task_25() {
  const [boxes, setBoxes] = useState([]);
  const [count, setCount] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [solved, setSolved] = useState(false);

  const targetPuzzle = [9, 2, 1, 8, 3, 4, 7, 6, 5];
  const initialPuzzle = [9, null, 1, null, null, null, null, 6, null];

  useEffect(() => {
    setBoxes(initialPuzzle);
  }, []);

  useEffect(() => {
    if (boxes.length === 9 && boxes.every((value) => value !== null)) {
      const isSolved = boxes.every(
        (value, index) => value === targetPuzzle[index],
      );
      setSolved(isSolved);
    } else {
      setSolved(false);
    }
  }, [boxes]);

  function fillBox(index) {
    const currentBoxValue = boxes[index];

    if (currentBoxValue !== null) {
      const newBoxes = boxes.map((value, idx) => {
        if (initialPuzzle[idx] !== null) return value;
        return value !== null && value > currentBoxValue ? null : value;
      });
      setBoxes(newBoxes);
      setCount(currentBoxValue + 1);
      return;
    }

    const newBoxes = [...boxes];
    newBoxes[index] = count;
    setBoxes(newBoxes);
    setCount(count + 1);
  }

  function handleMouseDown(index) {
    if (boxes[index] !== 1) return;

    setDragging(true);
    setSolved(false);
    const newBoxes = boxes.map((value, idx) =>
      initialPuzzle[idx] !== null ? initialPuzzle[idx] : null,
    );
    newBoxes[index] = 1;
    setBoxes(newBoxes);
    setCount(2);
  }

  function handleMouseMove(index) {
    if (!dragging) return;
    fillBox(index);
  }

  function handleMouseUp() {
    setDragging(false);
  }

  return (
    <div className="task25">
      <div className="task-25-container">
        {boxes.map((value, index) => (
          <div
            key={index}
            className={`box ${solved ? "solved" : ""} ${initialPuzzle[index] !== null ? "initial" : ""}`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseMove={() => handleMouseMove(index)}
            onMouseUp={handleMouseUp}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task_25;
