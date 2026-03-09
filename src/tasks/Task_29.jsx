import { useEffect } from "react";
import "./Task_29.css";
import * as faceapi from "face-api.js";

const loadModels = async () => {
  const MODEL_URL = "/models";

  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);

  console.log(faceapi.nets);
  detect();
};

const detect = async () => {
  const img = await faceapi.fetchImage("/person.jpg");

  const detections = await faceapi.detectAllFaces(img);

  console.log("Detections:", detections);
};

function Task_29() {
  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="task-29">
      <h2>Task 29</h2>
    </div>
  );
}
export default Task_29;
