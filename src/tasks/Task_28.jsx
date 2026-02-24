import "./Task_28.css";
function Task_28() {
  return (
    <div className="task-28">
      <div className="task-28-container">
        <div className="pattern">
          <div className="heading">Draw Your Pattern</div>
          <svg height={100} width={100} viewBox="0 0 100 100">
            <circle
              className="circle"
              cx={0}
              cy={0}
              fill="white"
              r={1.5}
            ></circle>
            <circle
              className="circle"
              cx={30}
              cy={0}
              fill="white"
              r={1.5}
            ></circle>
            <circle
              className="circle"
              cx={60}
              cy={0}
              fill="white"
              r={1.5}
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Task_28;
