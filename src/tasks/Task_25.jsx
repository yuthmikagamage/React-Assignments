import { useEffect, useState } from "react";
import "./Task_25.css";

function Task_25() {
  const [boxes, setBoxes] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const initialBoxes = Array(9).fill(null);
    setBoxes(initialBoxes);
  }, []);

  function clickBox(index) {
    if (boxes[index] !== null) return;

    const newBoxes = [...boxes];
    newBoxes[index] = count;

    setBoxes(newBoxes);
    setCount(count + 1);
  }

  return (
    <div className="task25">
      <div className="task-25-container">
        {boxes.map((value, index) => (
          <div key={index} className="box" onClick={() => clickBox(index)}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task_25;
