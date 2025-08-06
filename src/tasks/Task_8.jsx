import { useRef, useState } from "react";
import "./Task_8.css";

function Task_8() {
  const imageRef = useRef("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const canvasRef = useRef("");
  const [loaded, setLoaded] = useState(false);
  const [select, setSelect] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [endSelect, setEndSelct] = useState(false);
  const canvasCroppedRef = useRef("");

  function uploadImage() {
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setLoaded(true);
    }
  }

  function createCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
  }

  function reset() {
    setLoaded(false);
    setFile("");
  }

  function canvasCordination(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function handleMouseDown(event) {
    console.log("User Started Selecting");
    setSelect(true);
    const canvas = canvasRef.current;
    const coords = canvasCordination(canvas, event);
    console.log("Start x = " + coords.x + " y = " + coords.y);
    setStartPosition(coords);
    setEndSelct(false);
  }

  function handleMouseUp(event) {
    console.log("User Exit Selecting");
    const canvas = canvasRef.current;
    const coords = canvasCordination(canvas, event);
    console.log("Exit x = " + coords.x + " y = " + coords.y);
    setEndPosition(coords);
    setSelect(false);
    setEndSelct(true);
  }

  function handleMouseMove() {
    if (!select) {
      return;
    }
    console.log("User Started move");
  }

  function showImage() {
    console.log("Clicked download button");
    const cropX = Math.min(startPosition.x, endPosition.x);
    const cropY = Math.min(startPosition.y, endPosition.y);
    const cropWidth = Math.abs(endPosition.x - startPosition.x);
    const cropHeight = Math.abs(endPosition.y - startPosition.y);

    const canvas = canvasCroppedRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="task8">
      {!loaded && (
        <div className="beforeLoad">
          {" "}
          <div className="userin">
            <div className="title">Upload Images to Crop and Download</div>
            <div className="upload">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
              ></input>
              <button onClick={uploadImage}>Upload</button>
            </div>
          </div>
        </div>
      )}

      <img src={imageUrl} ref={imageRef} onLoad={createCanvas}></img>
      {loaded && (
        <div className="display">
          <h2>Drag and draw on image to set cropping area</h2>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          ></canvas>
          <button onClick={reset}>Reset</button>
          <button disabled={!endSelect} onClick={showImage}>
            Show & Download
          </button>
          {<div className="result"></div>}
          <canvas ref={canvasCroppedRef}></canvas>
        </div>
      )}
    </div>
  );
}

export default Task_8;
