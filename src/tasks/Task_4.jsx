import { useState } from "react";
import "./Task_4.css";
function Task_4() {
  const [items] = useState([
    { text: "Default", color: "#2b2a39" },
    { text: "Red", color: "#711c05" },
    { text: "Green", color: "#045b10" },
    { text: "Blue", color: "#060663" },
  ]);

  const [visibility, setVisibility] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState("#2b2a39");

  function clicking(event) {
    event.preventDefault();
    console.log("Right Clicked", event.pageX, event.pageY);

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const menuWidth = 150;
    const menuHeight = items.length * 35;

    let x = event.pageX;
    let y = event.pageY;

    if (x + menuWidth > windowWidth) {
      x = windowWidth - menuWidth - 10;
    }

    if (y + menuHeight > windowHeight) {
      y = windowHeight - menuHeight - 10;
    }
    setPosition({ x, y });
    setVisibility(true);
  }

  function clickMenu(selectedColor) {
    setBgColor(selectedColor);
  }

  return (
    <div className="task4">
      <div
        className="container"
        onContextMenu={(event) => clicking(event)}
        style={{ backgroundColor: bgColor }}
        onClick={() => setVisibility(false)}
      >
        {visibility && (
          <ul
            className="context-menu"
            style={{
              top: position.y,
              left: position.x,
              position: "absolute",
              listStyle: "none",
              padding: 0,
              margin: 0,
              zIndex: 1000,
              overflow: "hidden",
            }}
          >
            {items.map((item, index) => (
              <li key={index} onClick={() => clickMenu(item.color)}>
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default Task_4;
