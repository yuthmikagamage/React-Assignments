import { useState, useRef } from "react";
import "./Assignment_21.css";
function Assignment_21() {
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState({ rgb: "", hex: "" });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  function imageChange() {
    if (image) {
      setImgUrl(URL.createObjectURL(image));
    }
  }

  function handleImageLoad() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);
  }

  function handleCanvasClick(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
      (event.clientX - rect.left) * (canvas.width / rect.width)
    );
    const y = Math.floor(
      (event.clientY - rect.top) * (canvas.height / rect.height)
    );

    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;

    const r = data[0];
    const g = data[1];
    const b = data[2];

    const toHex = (value) => value.toString(16).padStart(2, "0").toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    setSelectedColor({
      rgb: `rgb(${r}, ${g}, ${b})`,
      hex: hex,
    });
  }

  return (
    <div>
      <h1>Assignment 21</h1>
      <div className="assign-21">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0])}
          />
          <button onClick={imageChange}>Upload</button>
        </div>

        {imgUrl && (
          <div>
            <div>
              <h3>Original Image:</h3>
              <img
                ref={imageRef}
                src={imgUrl}
                alt="Preview"
                onLoad={handleImageLoad}
              />
            </div>

            <div>
              <h3>Canvas (Click to pick color):</h3>
              <canvas ref={canvasRef} onClick={handleCanvasClick} />
            </div>
          </div>
        )}

        {selectedColor.rgb && (
          <div>
            <h3>Selected Color:</h3>
            <div>
              <div />
              <div>
                <p>
                  <strong>RGB:</strong> {selectedColor.rgb}
                </p>
                <p>
                  <strong>Hex:</strong> {selectedColor.hex}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignment_21;
