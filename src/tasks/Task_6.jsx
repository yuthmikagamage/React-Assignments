import { useRef, useState } from "react";
import "./Task_6.css";
function Task_6() {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const finalCanvasRef = useRef(null);
  const [pixelSize, setPixelSize] = useState(10);
  function upload() {
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }
  function canvasImage() {
    console.log("Image loaded for drawing canvas image");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
    createPixelImage(pixelSize);
  }
  function createPixelImage(currentPixelSize = pixelSize) {
    const canvasImg = canvasRef.current;
    const finalCanvas = finalCanvasRef.current;
    const canvasCtx = canvasImg.getContext("2d");
    const finalCtx = finalCanvas.getContext("2d");
    finalCanvas.width = canvasImg.width;
    finalCanvas.height = canvasImg.height;
    finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

    const imageData = canvasCtx.getImageData(
      0,
      0,
      canvasImg.width,
      canvasImg.height
    );
    for (let y = 0; y < canvasImg.height; y = y + currentPixelSize) {
      for (let x = 0; x < canvasImg.width; x = x + currentPixelSize) {
        const pixelIndex = (y * canvasImg.width + x) * 4;
        const r = imageData.data[pixelIndex];
        const g = imageData.data[pixelIndex + 1];
        const b = imageData.data[pixelIndex + 2];
        const a = imageData.data[pixelIndex + 3];
        finalCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        finalCtx.fillRect(x, y, currentPixelSize, currentPixelSize);
      }
    }
  }

  function pixelChange(e) {
    const newPixelSize = parseInt(e.target.value);
    setPixelSize(newPixelSize);
    console.log(newPixelSize);
    createPixelImage(newPixelSize);
  }

  return (
    <div className="task6">
      <h1>Upload Images to Blur</h1>
      <div className="userinput">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files[0])}
        ></input>
        <button onClick={upload}>Upload</button>
      </div>
      {imageUrl && (
        <div>
          <div className="imageDisplay">
            <div className="inputimg">
              <label>Input Image</label>
              <img src={imageUrl} ref={imageRef} onLoad={canvasImage}></img>
            </div>
            <div className="canvasimg">
              <label>Canvas Image</label>
              <canvas ref={canvasRef}></canvas>
            </div>
            <div className="finalImg">
              <label>Final Canvas Blured Image</label>
              <canvas ref={finalCanvasRef}></canvas>
            </div>
          </div>
          <div className="changePixel">
            <input
              type="range"
              value={pixelSize}
              onChange={(e) => pixelChange(e)}
              max={30}
              min={10}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
export default Task_6;
