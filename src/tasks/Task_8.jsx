import React, { useRef, useEffect, useCallback } from "react";
import "./Task_8.css";

function Task_8() {
  const spinnerRef = useRef(null);
  const rotationRef = useRef(0);
  const animationIdRef = useRef(null);
  const gameOverRef = useRef(false);
  const isThrowingRef = useRef(false);

  const animate = useCallback(() => {
    rotationRef.current += 2;
    if (rotationRef.current >= 360) rotationRef.current -= 360;

    if (spinnerRef.current) {
      spinnerRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
    }

    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [animate]);

  function checkOverHit() {}

  function throwKnife() {
    if (gameOverRef.current || isThrowingRef.current) return;
    isThrowingRef.current = true;
    checkOverHit();
  }

  return (
    <div className="task8">
      <div className="container" onClick={throwKnife}>
        <div className="spinner-container">
          <div className="spinner" ref={spinnerRef}></div>
        </div>
        <div
          className={`knife ${isThrowingRef.current ? "throwing" : ""}`}
        ></div>
      </div>
    </div>
  );
}

export default Task_8;
