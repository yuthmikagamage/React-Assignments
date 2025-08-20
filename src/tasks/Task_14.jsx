import { useEffect, useState } from "react";
import "./Task_14.css";

function Task_14() {
  const keyboard = [
    [
      "~",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    [
      "CapsLock",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ";",
      "'",
      "Enter",
    ],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Control", "Alt", "Command", " ", "Command", "Alt"],
  ];

  const [pressedKey, setPressedKey] = useState(null);

  useEffect(() => {
    function keyDown(event) {
      let key = event.key;

      if (key === " ") key = " ";
      if (key === "Backspace") key = "Backspace";
      if (key === "Enter") key = "Enter";
      if (key === "Tab") key = "Tab";
      if (key === "Alt") key = "Alt";
      if (key === "Control") key = "Control";
      if (key === "Command") key = "Meta";
      if (key === "CapsLock") key = "CapsLock";
      if (key === "Shift") key = "Shift";

      setPressedKey(key);
      console.log("Key pressed:", key);

      setTimeout(() => setPressedKey(null), 200);
    }

    function keyUp() {
      setPressedKey(null);
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  const isKeyActive = (keyItem) => {
    if (!pressedKey) return false;

    const keyStr = keyItem.toString();
    if (keyStr === " " && pressedKey === " ") return true;
    if (keyStr === "Backspace" && pressedKey === "Backspace") return true;
    if (keyStr === "Enter" && pressedKey === "Enter") return true;
    if (keyStr === "Tab" && pressedKey === "Tab") return true;
    if (keyStr === "CapsLock" && pressedKey === "CapsLock") return true;
    if (keyStr === "Shift" && pressedKey === "Shift") return true;
    if (keyStr === "Control" && pressedKey === "Control") return true;
    if (keyStr === "Alt" && pressedKey === "Alt") return true;
    if (keyStr === "Command" && pressedKey === "Meta") return true;
    if (keyStr === "Command" && pressedKey === "Meta") return true;

    return keyStr.toLowerCase() === pressedKey.toLowerCase();
  };

  const getKeyWidth = (key) => {
    const keyStr = key.toString();
    if (keyStr === "Backspace") return "key key-backspace";
    if (keyStr === "Tab") return "key key-tab";
    if (keyStr === "CapsLock") return "key key-caps";
    if (keyStr === "Enter") return "key key-enter";
    if (keyStr === "Shift") return "key key-shift";
    if (keyStr === " ") return "key key-space";
    if (keyStr === "Control" || keyStr === "Alt" || keyStr === "Meta")
      return "key key-modifier";
    return "key";
  };

  return (
    <div className="task14">
      <div className="container">
        <textarea
          placeholder="Start typing to see key highlights..."
          autoFocus
        />

        <div className="keyboard">
          {keyboard.map((row, rowIndex) => (
            <div className="keyboard-row" key={rowIndex}>
              {row.map((keyItem, keyIndex) => {
                const isActive = isKeyActive(keyItem);
                const baseClass = getKeyWidth(keyItem);
                const keyClass = `${baseClass} ${isActive ? "active" : ""}`;

                return (
                  <div className={keyClass} key={keyIndex}>
                    {keyItem}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task_14;
