import { useEffect, useState, useRef } from "react";
import "./Task_30.css";
import * as faceapi from "face-api.js";

const getDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const loadModels = async () => {
  const MODEL_URL = "./models";
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
};

function Task_30() {
  const [image, setImage] = useState(null);
  const [processed, setProcessed] = useState(false);
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setProcessed(false);
    }
  };

  const detectFace = async () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    setLoading(true);

    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const detections = await faceapi
      .detectAllFaces(canvas, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks();

    const sunglasses = new Image();
    sunglasses.src = "./sunglasses.png";

    sunglasses.onload = () => {
      detections.forEach((det) => {
        const positions = det.landmarks.positions;

        const right = positions[36];
        const left = positions[45];

        const eyeMidX = (right.x + left.x) / 2;
        const eyeMidY = (right.y + left.y) / 2;

        const width = getDistance(right, left) * 1.5;
        const height = width * (sunglasses.height / sunglasses.width);

        const angle = Math.atan2(left.y - right.y, left.x - right.x);

        ctx.save();
        ctx.translate(eyeMidX, eyeMidY);
        ctx.rotate(angle);
        ctx.drawImage(sunglasses, -width / 2, -height / 2, width, height);
        ctx.restore();
      });

      setLoading(false);
      setProcessed(true);
    };
  };

  return (
    <div className="task-30">
      <input
        type="file"
        accept="image/*"
        id="upload"
        onChange={handleImageUpload}
      />

      <label htmlFor="upload" className="upload-btn">
        Upload Image
      </label>

      {image && (
        <div
          className="preview"
          style={{ display: processed ? "none" : "block" }}
        >
          <img ref={imgRef} src={image} alt="preview" />
        </div>
      )}

      {image && (
        <canvas
          ref={canvasRef}
          className="canvas"
          style={{ display: processed ? "block" : "none" }}
        />
      )}

      {loading && <div className="loading-text">Detecting faces...</div>}

      {image && !loading && (
        <button className="detect-btn" onClick={detectFace}>
          {processed ? "Re-detect" : "Detect Face & Add Glasses"}
        </button>
      )}
    </div>
  );
}

export default Task_30;
