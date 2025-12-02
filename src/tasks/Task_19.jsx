import { useState, useEffect } from "react";
import "./Task_19.css";

function Task_19() {
  const [coordinations, setCordinations] = useState({
    Latitude: 0,
    Longitude: 0,
  });
  const [nearestLocation, setNearestLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestLocation = async (userLat, userLon) => {
    try {
      const response = await fetch("/srilanka.map.json");
      const data = await response.json();

      let nearest = null;
      let minDistance = Infinity;

      Object.keys(data).forEach((district) => {
        Object.keys(data[district]).forEach((city) => {
          const location = data[district][city];
          const lat = parseFloat(location.latitude);
          const lon = parseFloat(location.longitude);

          if (!isNaN(lat) && !isNaN(lon)) {
            const distance = calculateDistance(userLat, userLon, lat, lon);

            if (distance < minDistance) {
              minDistance = distance;
              nearest = {
                district: district,
                city: city,
                label: location.labels.si || location.labels.ta || city,
                distance: distance.toFixed(2),
                latitude: lat,
                longitude: lon,
              };
            }
          }
        });
      });

      setNearestLocation(nearest);
      setLoading(false);
    } catch (error) {
      console.error("Error loading location data:", error);
      setLoading(false);
    }
  };

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

      findNearestLocation(crd.latitude, crd.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setLoading(false);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div className="task19">
      <h2>Your Location</h2>
      <p>Latitude: {coordinations.Latitude}</p>
      <p>Longitude: {coordinations.Longitude}</p>

      {loading ? (
        <p>Finding nearest location...</p>
      ) : nearestLocation ? (
        <div className="nearest-location">
          <h3>Nearest Location</h3>
          <p>
            <strong>District:</strong> {nearestLocation.district}
          </p>
          <p>
            <strong>City:</strong> {nearestLocation.city}
          </p>
          <p>
            <strong>Label:</strong> {nearestLocation.label}
          </p>
          <p>
            <strong>Distance:</strong> {nearestLocation.distance} km
          </p>
        </div>
      ) : (
        <p>Could not find nearest location</p>
      )}
    </div>
  );
}

export default Task_19;
