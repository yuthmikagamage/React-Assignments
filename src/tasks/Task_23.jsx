import { useState } from "react";
import "./Task_23.css";

function Task_23() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="task23">
      <div className="mainContainer" theme={theme}>
        <div className="firstContainer">
          <h4>{theme === "light" ? "Light" : "Dark"} Mode</h4>
          <button
            className="toggle-button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <span className="toggle-slider"></span>
          </button>
        </div>
        <div className="secondContainer">
          <input placeholder="Search"></input>
        </div>
        <div className="thirdContainer">
          <div className="thirdContainerI"></div>
          <div className="thirdContainerII"></div>
        </div>
        <div className="forthContainer">
          <div className="forthContainerII"></div>
          <div className="forthContainerIII"></div>
          <div className="forthContainerVI"></div>
          <div className="forthContainerV"></div>
          <div className="forthContainerVI"></div>
          <div className="forthContainerVII"></div>
          <div className="forthContainerVIII"></div>
          <div className="forthContainerXI"></div>
          <div className="forthContainerX"></div>
          <div className="forthContainerXI"></div>
        </div>
      </div>
    </div>
  );
}

export default Task_23;
