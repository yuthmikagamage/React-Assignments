import { useState } from "react";
import "./Task_13.css";

function Task_13() {
  const [currentInput, setCurrentInput] = useState("");
  const [itemsOutput, setItemsOutput] = useState([]);

  function executeCommads(userInput) {
    try {
      console.log(userInput);
      const func = new Function("return (" + userInput + ")");
      const result = func();
      console.log(result);
      setItemsOutput((prev) => [
        ...prev,
        { command: userInput, output: String(result) },
      ]);
    } catch (error) {
      console.log(error.message);
      setItemsOutput((prev) => [
        ...prev,
        { command: userInput, output: error.message },
      ]);
    }
  }

  function pressKeyDown(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      console.log("Pressed Enter");
      executeCommads(currentInput);
      setCurrentInput("");
    }
  }

  return (
    <div className="task13">
      <div className="container">
        <div className="outputBox">
          {itemsOutput.map((item, index) => (
            <div className="commandresult" key={index}>
              <div className="command">- {item.command}</div>
              <div className="output">{item.output}</div>
            </div>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={pressKeyDown}
          value={currentInput}
          onChange={(event) => setCurrentInput(event.target.value)}
          placeholder="Enter JavaScript Commands"
        ></input>
      </div>
    </div>
  );
}

export default Task_13;
