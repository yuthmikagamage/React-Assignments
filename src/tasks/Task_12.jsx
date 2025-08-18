import React, { useState } from "react";
import "./Task_12.css";

function Task_12() {
  const items = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
    { id: 4, title: "Item 4" },
    { id: 5, title: "Item 5" },
    { id: 6, title: "Item 6" },
    { id: 7, title: "Item 7" },
    { id: 8, title: "Item 8" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="task12">
      <div className="slider-container">
        <div className="slider-wrapper">
          <button
            onClick={prevSlide}
            className="nav-button nav-button-left"
            aria-label="Previous items"
          >
            -
          </button>

          <button
            onClick={nextSlide}
            className="nav-button nav-button-right"
            aria-label="Next items"
          >
            +
          </button>

          <div className="items-container">
            <div className="items-track">
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.id}-${currentIndex}-${index}`}
                  className="item-slide"
                >
                  <div className="item-card">
                    <h3 className="item-title">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task_12;
