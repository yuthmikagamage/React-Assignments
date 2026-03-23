import { useEffect, useState, useRef } from "react";
import "./Task_30.css";
import * as faceapi from "face-api.js";

const eyesMiddleTop = 28;
const eyesMiddleBottom = 30;
const lipsBottom = 58;
const faceBottom = 9;
const rightEyeInner = 40;
const rightEyeOuter = 37;
const leftEyeInner = 43;
const leftEyeOuter = 46;

const getDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const getOrientation = (positions, box) => {
  const pos_x = (box.right + box.left) / 2;
  const pos_y = (box.bottom + box.top) / 2;

  const rot_x_a = getDistance(
    positions[eyesMiddleBottom],
    positions[eyesMiddleTop],
  );
  const rot_x_b = getDistance(positions[lipsBottom], positions[faceBottom]);

  const rot_x = Math.asin((0.5 - rot_x_b / (rot_x_a + rot_x_b)) * 2);

  const rot_y_a = getDistance(
    positions[rightEyeOuter],
    positions[rightEyeInner],
  );
  const rot_y_b = getDistance(positions[leftEyeInner], positions[leftEyeOuter]);

  const rot_y = Math.asin((0.5 - rot_y_b / (rot_y_a + rot_y_b)) * 2) * 2.5;

  const rot_z_y = positions[rightEyeOuter].y - positions[leftEyeOuter].y;

  const rot_z_d = getDistance(
    positions[rightEyeOuter],
    positions[leftEyeOuter],
  );

  const rot_z = Math.asin(rot_z_y / rot_z_d);

  const scale =
    getDistance(positions[rightEyeOuter], positions[leftEyeOuter]) * 0.7;

  if (rot_y > 0.7 || rot_y < -0.7) return null;

  return {
    position: { x: pos_x, y: pos_y },
    rotation: { x: rot_x, y: rot_y, z: rot_z },
    scale: { x: scale, y: scale },
  };
};

const loadModels = async () => {
  const MODEL_URL = "./models";

  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

  console.log("Models Loaded");
};

function Task_30() {
  const [image, setImage] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setOrientation(null);
    }
  };

  const detectFace = async () => {
    if (!imgRef.current) return;

    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks();

    if (detections.length === 0) {
      setOrientation(null);
      return;
    }

    const result = detections[0];
    const positions = result.landmarks.positions;
    const box = result.detection.box;

    const data = getOrientation(positions, box);

    setOrientation(data);
  };

  return (
    <div className="task-30">
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
          <div className="preview-container">
            <img ref={imgRef} src={image} alt="preview" onLoad={detectFace} />
          </div>

          <button className="detect-btn" onClick={detectFace}>
            Analyze Face
          </button>
        </>
      )}

      {orientation && (
        <div className="result-box">
          <h3>Face Orientation</h3>

          <p>
            <strong>Position:</strong> x: {orientation.position.x.toFixed(2)},
            y: {orientation.position.y.toFixed(2)}
          </p>

          <p>
            <strong>Rotation:</strong> x: {orientation.rotation.x.toFixed(3)},
            y: {orientation.rotation.y.toFixed(3)}, z:{" "}
            {orientation.rotation.z.toFixed(3)}
          </p>

          <p>
            <strong>Scale:</strong> x: {orientation.scale.x.toFixed(2)}, y:{" "}
            {orientation.scale.y.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Task_30;
