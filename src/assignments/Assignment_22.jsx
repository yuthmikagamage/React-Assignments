import { useState } from "react";
import "./Assignment_22.css";

function Assignment_22() {
  const [fileInput, setFileInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  });

  const filterControls = [
    { name: "blur", min: 0, max: 10 },
    { name: "brightness", min: 0, max: 200 },
    { name: "contrast", min: 0, max: 200 },
    { name: "grayscale", min: 0, max: 100 },
    { name: "hueRotate", min: 0, max: 360 },
    { name: "invert", min: 0, max: 100 },
    { name: "opacity", min: 0, max: 100 },
    { name: "saturate", min: 0, max: 200 },
    { name: "sepia", min: 0, max: 100 },
  ];

  function resetFilters() {
    setFilters({
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
    });
  }

  function uploadImg() {
    if (fileInput) {
      setImgUrl(URL.createObjectURL(fileInput));
    }
  }

  function filterValueChange(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  }

  function getImageStyle() {
    return {
      filter: `
        blur(${filters.blur}px)
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        grayscale(${filters.grayscale}%)
        hue-rotate(${filters.hueRotate}deg)
        invert(${filters.invert}%)
        opacity(${filters.opacity}%)
        saturate(${filters.saturate}%)
        sepia(${filters.sepia}%)
      `,
      maxWidth: "100%",
      height: "auto",
      marginBottom: "20px",
    };
  }

  return (
    <div>
      <h1>Assignment 22</h1>
      <div className="assign-22">
        <div className="userin">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setFileInput(event.target.files[0])}
          />
          <button onClick={uploadImg}>Upload</button>
        </div>
        {imgUrl && <img src={imgUrl} alt="preview" style={getImageStyle()} />}
        {imgUrl && (
          <div className="userInputs">
            {filterControls.map((filter) => (
              <div key={filter.name} className="filterValueIn">
                <input
                  type="range"
                  max={filter.max}
                  min={filter.min}
                  value={filters[filter.name]}
                  onChange={(event) =>
                    filterValueChange(filter.name, event.target.value)
                  }
                />
                <p>
                  {filter.name}: {filters[filter.name]}
                </p>
              </div>
            ))}
            <button onClick={resetFilters}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignment_22;
