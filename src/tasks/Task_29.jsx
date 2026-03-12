import { useEffect, useState, useRef } from "react";
import "./Task_29.css";
import * as faceapi from "face-api.js";

const loadModels = async () => {
  const MODEL_URL = "./models";
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  console.log("Model Loaded");
};

function Task_29() {
  const [image, setImage] = useState(null);
  const imgRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const detectFace = async () => {
    if (!imgRef.current) return;

    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.SsdMobilenetv1Options(),
    );

    console.log("Detections:", detections);

    const canvas = canvasRef.current;

    const displaySize = {
      width: imgRef.current.width,
      height: imgRef.current.height,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    const resized = faceapi.resizeResults(detections, displaySize);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resized);
  };

  return (
    <div className="task-29">
      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          onChange={handleImageUpload}
        />

        <label htmlFor="imageUpload" className="upload-btn">
          Upload Image
        </label>
      </div>

      {image && (
        <>
          <div className="preview-container" style={{ position: "relative" }}>
            <img
              ref={imgRef}
              src={image}
              alt="preview"
              style={{ width: "100%" }}
            />

            <canvas ref={canvasRef} />
          </div>

          <button className="detect-btn" onClick={detectFace}>
            Detect Face
          </button>
        </>
      )}
    </div>
  );
}

export default Task_29;
