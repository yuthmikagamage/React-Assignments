import { useRef, useState } from "react";
import "./Task_9.css";
function Task_9() {
  const [state, setState] = useState(0);
  const position = useRef({ x: 200, y: 100 });
  const speed = useRef({ x: 5, y: 2 });

  useState(() => {
    function animate() {
      requestAnimationFrame(animate);
      setState((prev) => prev + 1);
      position.current.x += speed.current.x;
      position.current.y += speed.current.y;

      if (position.current.x > 380) {
        speed.current.x *= -1;
      }
      if (position.current.x < 0) {
        speed.current.x *= -1;
      }
      if (position.current.y > 380) {
        speed.current.y *= -1;
      }
      if (position.current.y < 0) {
        speed.current.y *= -1;
      }
    }
    requestAnimationFrame(animate);
  }, []);
  return (
    <div className="task9" data-counter={state}>
      <div className="container">
        <div
          className="ball"
          style={{ left: position.current.x, top: position.current.y }}
        ></div>
      </div>
    </div>
  );
}
export default Task_9;
