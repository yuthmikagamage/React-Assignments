import { useState, useRef } from "react";
import "./Task_17.css";

function Task_17() {
  const itemArray = Array.from({ length: 64 }, (_, index) => index + 1);
  const containerRef = useRef(null);

  const getBackgroundColor = (num) => {
    const hue = (num * 30) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  function clickNumber(item, event) {
    const element = event.currentTarget;
    const container = containerRef.current;
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const fixedTop = elementRect.top;
    const fixedLeft = elementRect.left;
    const targetTop = containerRect.top + 10;
    const targetLeft = containerRect.left + 10;

    setAnimationData({
      originalWidth: elementRect.width,
      originalHeight: elementRect.height,
      originalTop: fixedTop,
      originalLeft: fixedLeft,
      targetWidth: containerRect.width - 20,
      targetHeight: containerRect.height - 20,
      targetTop: targetTop,
      targetLeft: targetLeft,
      item: item,
    });

    setSelectedItem(item);
  }

  function closeExpanded(event) {
    event.stopPropagation();

    const expandedElement = document.querySelector(".number.expanded");
    if (expandedElement) {
      expandedElement.style.animation =
        "collapseItem 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    }

    setTimeout(() => {
      setSelectedItem(null);
      setAnimationData(null);
    }, 300);
  }

  return (
    <div className="task17">
      <div className="container" ref={containerRef}>
        {itemArray.map((item, index) => (
          <div
            className={`number ${selectedItem === item ? "expanded" : ""} ${
              selectedItem && selectedItem !== item ? "hidden" : ""
            }`}
            key={index}
            style={{
              backgroundColor: getBackgroundColor(item),
              ...(selectedItem === item && animationData
                ? {
                    "--original-width": `${animationData.originalWidth}px`,
                    "--original-height": `${animationData.originalHeight}px`,
                    "--original-top": `${animationData.originalTop}px`,
                    "--original-left": `${animationData.originalLeft}px`,
                    "--target-width": `${animationData.targetWidth}px`,
                    "--target-height": `${animationData.targetHeight}px`,
                    "--target-top": `${animationData.targetTop}px`,
                    "--target-left": `${animationData.targetLeft}px`,
                  }
                : {}),
            }}
            onClick={(e) => selectedItem !== item && clickNumber(item, e)}
          >
            <span className="number-text">{item}</span>
            {selectedItem === item && (
              <div className="close-button" onClick={closeExpanded}>
                ×
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task_17;
