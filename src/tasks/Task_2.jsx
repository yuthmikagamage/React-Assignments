import { useEffect, useState } from "react";
import "./Task_2.css";

function Task_2() {
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imageDisplay, setImageDisplay] = useState(false);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImgUrl(URL.createObjectURL(file));
      setImageDisplay(true);
    }
  }

  function handlePaste(event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setImage(file);
          setImgUrl(URL.createObjectURL(file));
          setImageDisplay(true);
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  function clearImg() {
    setImageDisplay(false);
    setImgUrl("");
    setImage("");
  }

  return (
    <div className="task2">
      <h1>Drag Images to Upload</h1>
      {!imageDisplay && (
        <div className="fileinputtsk2">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            onDrag={handleUpload}
          ></input>
        </div>
      )}
      {imageDisplay && (
        <div className="output">
          <img src={imgUrl}></img>
          <button onClick={clearImg}>Clear Image</button>
        </div>
      )}
    </div>
  );
}
export default Task_2;
