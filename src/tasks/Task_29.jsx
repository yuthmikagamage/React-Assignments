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

    console.log("result:", detections);
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
        <div className="preview-container">
          <img ref={imgRef} src={image} alt="preview" onLoad={detectFace} />
        </div>
      )}
    </div>
  );
}

export default Task_29;
