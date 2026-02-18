import "./Task_27.css";
function Task_27() {
  return (
    <div className="task27">
      <svg width={350} height={350}>
        <circle
          cx={80}
          cy={100}
          r={50}
          stroke="green"
          fill="yellow"
          strokeWidth={4}
        ></circle>
        <rect
          x={150}
          y={50}
          height={100}
          width={150}
          stroke="red"
          fill="blue"
        ></rect>
        <rect
          x={10}
          y={200}
          ry={20}
          height={100}
          width={150}
          stroke="black"
          fill="green"
        ></rect>
      </svg>
      <svg width={250} height={250}>
        <polygon
          points="100,10 40, 198 190,78 10, 78 160,198"
          fill="purple"
        ></polygon>
      </svg>

      <svg width={250} height={250}>
        <defs>
          <linearGradient id="grad1">
            {" "}
            <stop offset="0%" stop-color="yellow" />
            <stop offset="100%" stop-color="red" />
          </linearGradient>
        </defs>
        <ellipse cx={100} cy={70} rx={85} ry={55} fill="url(#grad1)"></ellipse>
        <text x={80} y={75} fill="white">
          SVG
        </text>
      </svg>
    </div>
  );
}
export default Task_27;
