import { useState } from "react";
import "./Task_23.css";

function Task_23() {
  const [theme, setTheme] = useState("light");

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
      </div>
    </div>
  );
}

export default Task_23;
