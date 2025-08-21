import "./Task_15.css";

function Task_15() {
  const elements = [];

  for (let i = 0; i < 3; i++) {
    const rowArray = [];
    for (let v = 0; v < 3; v++) {
      let visibl;
      if (i == 1 && v == 1) {
        visibl = "hidden";
      } else {
        visibl = "visible";
      }
      rowArray.push(
        <div
          className="cropImg"
          style={{
            backgroundPosition: `-${i * 100}px -${v * 100}px`,
            visibility: visibl,
          }}
        ></div>
      );
    }
    elements.push(rowArray);
  }
  console.log(elements);

  const flatElements = elements.flat();

  console.log(flatElements);

  for (let i = flatElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatElements[i], flatElements[j]] = [flatElements[j], flatElements[i]];
  }

  const shuffleElements = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let v = 0; v < 3; v++) {
      row.push(flatElements[i * 3 + v]);
    }
    shuffleElements.push(row);
  }

  return (
    <div className="task15">
      <div className="container">
        <div className="hint">Use Arrow Keys to Move Puzzle</div>
        <div className="puzzle">
          {shuffleElements.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Task_15;
