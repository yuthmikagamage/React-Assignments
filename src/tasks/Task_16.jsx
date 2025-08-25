import { useEffect, useState } from "react";
import "./Task_16.css";

function Task_16() {
  const [items, setItems] = useState([
    { id: 0, Description: "THIS IS", Color: "purple" },
    { id: 1, Description: "A SLIDE SHOW", Color: "cornflowerblue" },
    { id: 2, Description: "ONLINE EDITOR", Color: "brown" },
    { id: 3, Description: "CREATED FROM", Color: "orange" },
    { id: 4, Description: "REACT JS", Color: "green" },
  ]);

  const [currentItem, setCurrentItem] = useState();
  const [editing, setEditing] = useState(false);
  const [newItemText, setNewItemText] = useState("Sample Text");
  const [newItemColor, setNewItemColor] = useState(null);

  useEffect(() => {
    changeCurrentItem(0);
  }, []);

  function changeCurrentItem(num) {
    setEditing(false);
    setCurrentItem(items[num]);
  }

  function addButtonClick() {
    setEditing(true);
  }

  function addNewItem() {
    const newId = items.length;

    const newItem = {
      id: newId,
      Description: newItemText,
      Color: newItemColor,
    };

    setItems((prev) => [...prev, newItem]);
    setCurrentItem(newItem);
    setEditing(false);
    setNewItemText("Sample Text");
    setNewItemColor(null);
  }

  return (
    <div className="task16">
      <div className="container">
        <div className="allItems">
          {items.map((singleItem, key) => (
            <div
              className="listing"
              style={{ backgroundColor: singleItem.Color }}
              key={key}
              onClick={() => changeCurrentItem(singleItem.id)}
            >
              {singleItem.Description[0]}
            </div>
          ))}
          <button onClick={addButtonClick}>+</button>
        </div>
        {!editing && currentItem && (
          <div
            className="selectedItem"
            style={{ backgroundColor: currentItem.Color }}
          >
            {currentItem.Description}
          </div>
        )}
        {editing && currentItem && (
          <div className="editingItem">
            <input
              type="text"
              className="editInput"
              value={newItemText}
              onChange={(event) => setNewItemText(event.target.value)}
            ></input>
            <div className="otherInput">
              <select onChange={(event) => setNewItemColor(event.target.value)}>
                <option value={"purple"} style={{ backgroundColor: "purple" }}>
                  Default
                </option>
                <option value={"purple"}>Purple</option>
                <option value={"cornflowerblue"}>Blue</option>
                <option value={"brown"}>Brown</option>
                <option value={"orange"}>Orange</option>
                <option value={"green"}>Green</option>
              </select>
              <button disabled={newItemColor == null} onClick={addNewItem}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Task_16;
