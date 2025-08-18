import { useState } from "react";
import "./Task_13.css";

function Task_13() {
  const [currentInput, setCurrentInput] = useState("");

  function executeCommads(userInput) {
    console.log(userInput);
    const func = new Function("return (" + userInput + ")");
    const result = func();
    console.log(result);
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
