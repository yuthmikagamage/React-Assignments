import { useEffect, useRef, useState } from "react";
import "./Task_11.css";
function Task_11() {
  const items = [
    ["☘️", "🏕️", "🌿", "🌲", "🌳", "🌾", "🌴", "🍃"],
    ["🍔", "🥤", "🥗", "🍗", "🍟", "🥓", "🥞", "🍲"],
    ["🐹", "🦊", "🦁", "🦓", "🐱", "🐶", "🐯", "🐼"],
    ["🍧", "🍨", "🧁", "🍰", "🍫", "🍩", "🍦", "🍹"],
  ];
  const currentOption = useRef(2);
  const [itemArray, setItemArray] = useState([]);
  const [cardStates, setCardStates] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    optionChange(currentOption.current);
  }, []);

  function optionChange(option) {
    currentOption.current = option;
    let selectedItems = items[currentOption.current];
    let newItems = [];
    for (let s = 0; s < 8; s++) {
      newItems.push(selectedItems[s]);
    }
    for (let s = 0; s < 8; s++) {
      newItems.push(selectedItems[s]);
    }
    for (let i = 0; i < newItems.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    }
    setItemArray(newItems);
    const initialStates = newItems.map(() => ({
      flipped: false,
      done: false,
    }));
    setCardStates(initialStates);
    setFlippedCards([]);
  }

  function handleCardClick(index) {
    console.log("Card Click " + index);
    if (flippedCards.length >= 2) return;
    if (cardStates[index].done || cardStates[index].flipped) return;

    const newCardStates = [...cardStates];
    newCardStates[index].flipped = true;
    setCardStates(newCardStates);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = itemArray[firstIndex];
      const secondCard = itemArray[secondIndex];

      setTimeout(() => {
        if (firstCard === secondCard) {
          const updatedStates = [...newCardStates];
          updatedStates[firstIndex].done = true;
          updatedStates[secondIndex].done = true;
          setCardStates(updatedStates);
        } else {
          const updatedStates = [...newCardStates];
          updatedStates[firstIndex].flipped = false;
          updatedStates[secondIndex].flipped = false;
          setCardStates(updatedStates);
        }
        setFlippedCards([]);
      }, 500);
    }
  }

  return (
    <div className="task11">
      <div className="container">
        <div className="options">
          <button className="option" onClick={() => optionChange(0)}>
            {items[0][0]} Nature
          </button>
          <button className="option" onClick={() => optionChange(1)}>
            {items[1][0]} Foods
          </button>
          <button className="option" onClick={() => optionChange(2)}>
            {items[2][0]} Animals
          </button>
          <button className="option" onClick={() => optionChange(3)}>
            {items[3][0]} Dessert
          </button>
        </div>

        <div className="board">
          {itemArray.map((items, index) => (
            <div
              className="cardWrapper"
              key={index}
              flipped={cardStates[index]?.flipped ? "true" : "false"}
              done={cardStates[index]?.done ? "true" : "false"}
              onClick={() => handleCardClick(index)}
            >
              <div className="card">{items}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Task_11;
