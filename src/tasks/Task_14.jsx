import "./Task_14.css";
function Task_14() {
  const keyboard = [
    ["~", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "_", "=", "Delete"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "|"],
    [
      "Caps Lock",
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
      "'",
      "Return",
    ],
    ["Swift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Swift"],
    ["Control", "Option", "Command", "Space", "Command", "Option"],
  ];
  return (
    <div className="task14">
      <div className="container">
        <textarea placeholder="Enter any kind of text in this textarea"></textarea>
        {console.log(keyboard)}
      </div>
    </div>
  );
}
export default Task_14;
