import { useEffect, useState } from "react";
import "./Task_16.css";

function Task_16() {
  const [items, setItems] = useState([
    { id: 0, Description: "THIS IS", Color: "purple", Animate: "Instant" },
    {
      id: 1,
      Description: "A SLIDE SHOW",
      Color: "cornflowerblue",
      Animate: "Up",
    },
    { id: 2, Description: "ONLINE EDITOR", Color: "brown", Animate: "Fade" },
    { id: 3, Description: "CREATED FROM", Color: "orange", Animate: "Down" },
    { id: 4, Description: "REACT JS", Color: "green", Animate: "Blur" },
  ]);

  const [currentItem, setCurrentItem] = useState();
  const [slideshow, setSlideshow] = useState(false);

  useEffect(() => {
    changeCurrentItem(0);
  }, []);

  function changeCurrentItem(id) {
    const foundItem = items.find((item) => item.id === id);
    setCurrentItem(foundItem);
  }

  function addButtonClick() {
    const newId = items.length;

    const newItem = {
      id: newId,
      Description: "Sample Text",
      Color: "purple",
    };

    setItems((prev) => [...prev, newItem]);
    setCurrentItem(newItem);
  }

  function deleteSlide(deleteId) {
    setItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== deleteId);
      if (currentItem && currentItem.id === deleteId) {
        setCurrentItem(updatedItems[0] || null);
      }
      return updatedItems;
    });
  }

  function slideShowButtonClick() {
    setSlideshow(true);
  }

  function goToNextSlide() {
    const currentIndex = items.findIndex((item) => item.id === currentItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    const nextItem = items[nextIndex];
    setCurrentItem(nextItem);
  }

  function getAnimationClass(animationType) {
    switch (animationType) {
      case "Fade":
        return "fade-animation";
      case "Up":
        return "up-animation";
      case "Down":
        return "down-animation";
      case "Blur":
        return "blur-animation";
      case "Rotate":
        return "rotate-animation";
      default:
        return "instant-animation";
    }
  }

  return (
    <div className="task16">
      {slideshow && (
        <div className="slideShow">
          <div
            className={`selectedSlideshowItem ${getAnimationClass(
              currentItem.Animate
            )}`}
            style={{ backgroundColor: currentItem.Color }}
          >
            {currentItem.Description}
            <button className="closeButton" onClick={() => setSlideshow(false)}>
              X
            </button>
            <button className="nextButton" onClick={goToNextSlide}>
              Next
            </button>
          </div>
        </div>
      )}
      {!slideshow && (
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
          {currentItem && (
            <div
              className="selectedItem"
              style={{ backgroundColor: currentItem.Color }}
            >
              <button
                className="deleteSlide"
                onClick={() => deleteSlide(currentItem.id)}
              >
                Delete
              </button>
              <button className="playSlide" onClick={slideShowButtonClick}>
                Slideshow
              </button>
              <input
                type="text"
                value={currentItem.Description}
                className="itemTextInput"
                onChange={(event) => {
                  const newText = event.target.value;
                  setItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === currentItem.id
                        ? { ...item, Description: newText }
                        : item
                    )
                  );
                  setCurrentItem((prev) => ({ ...prev, Description: newText }));
                }}
              />
              <select
                className="colorSelect"
                value={currentItem.Color}
                onChange={(event) => {
                  const newColor = event.target.value;
                  setItems((prev) =>
                    prev.map((item) =>
                      item.id == currentItem.id
                        ? { ...item, Color: newColor }
                        : item
                    )
                  );
                  setCurrentItem((prev) => ({ ...prev, Color: newColor }));
                }}
              >
                <option value={"purple"}>Purple</option>
                <option value={"cornflowerblue"}>Blue</option>
                <option value={"brown"}>Brown</option>
                <option value={"orange"}>Orange</option>
                <option value={"green"}>Green</option>
              </select>
              <select
                className="animationSelect"
                value={currentItem.Animate}
                onChange={(event) => {
                  const newAnimation = event.target.value;
                  setItems((prev) =>
                    prev.map((item) =>
                      item.id == currentItem.id
                        ? { ...item, Animate: newAnimation }
                        : item
                    )
                  );
                  setCurrentItem((prev) => ({
                    ...prev,
                    Animate: newAnimation,
                  }));
                }}
              >
                <option>Instant </option>
                <option>Fade</option>
                <option>Up</option>
                <option>Down</option>
                <option>Blur</option>
                <option>Rotate</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Task_16;
