import { useEffect, useState } from "react";
import "./Task_23.css";

function Task_23() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function changeTheme() {
    setIsDarkMode((prev) => !prev);
  }

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--backgroundColor",
      isDarkMode ? "white" : "black"
    );
  }, [isDarkMode]);

  return (
    <div className="task23">
      <div className="mainContainer">
        <div className="firstContainer">
          <button onClick={changeTheme}>Change</button>
        </div>
      </div>
    </div>
  );
}
export default Task_23;
