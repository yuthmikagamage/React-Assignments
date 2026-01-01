import { useState } from "react";
import "./Task_23.css";

function Task_23() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="task23">
      <div className="mainContainer" theme={theme}>
        <div className="firstContainer">
          <h4>{theme === "light" ? "Light" : "Dark"} mode</h4>
          <button
            className="toggle-button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <span className="toggle-slider"></span>
          </button>
        </div>
        <div className="secondContainer">
          <div className="inputWrapper">
            <input placeholder="Search..." />
            <img src="/search-symbol.png" alt="search" className="searchIcon" />
          </div>
        </div>
        <div className="thirdContainers">
          <div className="thirdContainer-box">
            <div className="thirdWrapper">
              <div className="firstLine">
                <div
                  className="colorBox"
                  style={{ backgroundColor: " rgb(139, 46, 210) " }}
                ></div>
                <div className="Line" style={{ width: "100px" }}></div>
              </div>
              <div className="Line" style={{ width: "100px" }}></div>
              <div className="Line" style={{ width: "80px" }}></div>
              <div className="Line" style={{ width: "120px" }}></div>
            </div>
          </div>
          <div className="thirdContainer-box">
            <div className="thirdWrapper">
              <div className="firstLine">
                <div
                  className="colorBox"
                  style={{ backgroundColor: " rgb(220, 168, 46) " }}
                ></div>
                <div className="Line" style={{ width: "100px" }}></div>
              </div>
              <div className="Line" style={{ width: "100px" }}></div>
              <div className="Line" style={{ width: "80px" }}></div>
              <div className="Line" style={{ width: "120px" }}></div>
            </div>
          </div>
        </div>
        <div className="forthContainer">
          <div className="bar">
            <div className="bar-value" style={{ height: "15%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "25%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "40%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "50%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "65%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "80%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "65%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "45%" }}></div>
          </div>
          <div className="bar">
            <div className="bar-value" style={{ height: "35%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task_23;
