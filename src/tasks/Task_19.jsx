import { useState, useEffect } from "react";
import "./Task_19.css";

function Task_19() {
  const [cordinations, setCordinations] = useState({
    Latitude: 0,
    Longitude: 0,
  });

  useEffect(() => {
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

      setCordinations({
        Latitude: crd.latitude,
        Longitude: crd.longitude,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div className="task19">
      <h2>Latitude: {cordinations.Latitude}</h2>
      <h2>Longitude: {cordinations.Longitude}</h2>
    </div>
  );
}

export default Task_19;
