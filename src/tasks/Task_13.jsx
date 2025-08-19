import { useRef, useState } from "react";
import "./Task_13.css";

function Task_13() {
  const [currentInput, setCurrentInput] = useState("");
  const [itemsOutput, setItemsOutput] = useState([]);
  const currentCommandIndex = useRef(-1);

  function executeCommads(userInput) {
    try {
      console.log(userInput);
      const func = new Function("return (" + userInput + ")");
      const result = func();
      console.log(result);

      setItemsOutput((prev) => {
        const newOutput = [
          ...prev,
          {
            command: userInput,
            output: String(result),
            color: "cornflowerblue",
          },
        ];
        currentCommandIndex.current = -1;
        return newOutput;
      });
    } catch (error) {
      console.log(error.message);

      setItemsOutput((prev) => {
        const newOutput = [
          ...prev,
          { command: userInput, output: error.message, color: "red" },
        ];
        currentCommandIndex.current = -1;
        return newOutput;
      });
    }
  }

  function pressKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Pressed Enter");
      executeCommads(currentInput);
      setCurrentInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (itemsOutput.length === 0) return;
      if (currentCommandIndex.current === -1) {
        currentCommandIndex.current = itemsOutput.length - 1;
      } else if (currentCommandIndex.current > 0) {
        currentCommandIndex.current -= 1;
      }

      setCurrentInput(itemsOutput[currentCommandIndex.current].command);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();

      if (itemsOutput.length === 0 || currentCommandIndex.current === -1)
        return;

      if (currentCommandIndex.current < itemsOutput.length - 1) {
        currentCommandIndex.current += 1;
        setCurrentInput(itemsOutput[currentCommandIndex.current].command);
      } else {
        currentCommandIndex.current = -1;
        setCurrentInput("");
      }
    }
  }

  return (
    <div className="task13">
      <div className="container">
        <div className="outputBox">
          {itemsOutput.map((item, index) => (
            <div className="commandresult" key={index}>
              <div className="command">- {item.command}</div>
              <div className="output" style={{ color: item.color }}>
                {item.output}
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={pressKeyDown}
          value={currentInput}
          onChange={(event) => setCurrentInput(event.target.value)}
          placeholder="Enter JavaScript Commands"
        />
      </div>
    </div>
  );
}

export default Task_13;
