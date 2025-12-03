import { useState } from "react";
import "./Task_19.css";

function Task_19() {
  const [coordinations, setCoordinations] = useState({
    Latitude: 0,
    Longitude: 0,
  });
  function findCoordinates() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      setCoordinations({
        Latitude: crd.latitude,
        Longitude: crd.longitude,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <div className="task19">
      <div className="container">
        {coordinations.Latitude !== 0 ? (
          <div>
            <h2>Your Location</h2>
            <p>Latitude: {coordinations.Latitude}</p>
            <p>Longitude: {coordinations.Longitude}</p>
          </div>
        ) : (
          <div>
            <button onClick={findCoordinates}>Find Coordinations</button>
            <h3>Location Not Available</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task_19;
