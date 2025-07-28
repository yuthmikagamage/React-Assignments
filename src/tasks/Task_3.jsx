import { useState } from "react";
import "./Task_3.css";
function Task_3() {
  const [items, setItems] = useState([
    { id: 1, text: "Item #1", color: "#10b981" },
    { id: 2, text: "Item #2", color: "#ca8a04" },
    { id: 3, text: "Item #3", color: "#f97316" },
    { id: 4, text: "Item #4", color: "#7c3aed" },
    { id: 5, text: "Item #5", color: "#ec4899" },
  ]);

  const [dragging, setDraggiing] = useState(null);

  function handleDragStart(e, index, item) {
    setDraggiing({ index, item });
    console.log("Currently dragging item:", index);
  }

  function handleDrop(e, dropIndex) {
    e.preventDefault();
    console.log("Current item droped at index: ", dropIndex);
    if (dragging && dragging.index !== dropIndex) {
      const newItems = [...items];
      const [draggedItem] = newItems.splice(dragging.index, 1);
      newItems.splice(dropIndex, 0, draggedItem);
      setItems(newItems);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="task3-wrapper">
      <div className="task3">
        <div className="title">Drag and Drop Elements to Reorder Them</div>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="item"
            id={index}
            draggable="true"
            style={{ backgroundColor: item.color }}
            onDragStart={(e) => handleDragStart(e, index, item)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task_3;
