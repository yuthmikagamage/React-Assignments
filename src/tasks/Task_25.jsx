import { useEffect, useState } from "react";
import "./Task_25.css";

function Task_25() {
  const [boxes, setBoxes] = useState([]);
  const [count, setCount] = useState(1);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const initialBoxes = Array(9).fill(null);
    setBoxes(initialBoxes);
  }, []);

  function fillBox(index) {
    const currentBoxValue = boxes[index];

    if (currentBoxValue !== null) {
      const newBoxes = boxes.map((value) =>
        value !== null && value > currentBoxValue ? null : value,
      );
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
    setBoxes(Array(9).fill(null));
    setCount(1);
    setDragging(true);

    const newBoxes = Array(9).fill(null);
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
            className="box"
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
