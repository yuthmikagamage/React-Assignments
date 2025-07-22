import { useState } from "react";
import "./Assignment_21.css";
function Assignement_21() {
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  function imageChange() {
    if (image) {
      setImgUrl(URL.createObjectURL(image));
    }
  }

  return (
    <div className="assign-21">
      <h1>Assignment 21</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => setImage(event.target.files[0])}
      />
      <button onClick={imageChange}>Upload</button>
      {imgUrl && <img src={imgUrl} alt="Preview" />}
    </div>
  );
}

export default Assignement_21;
