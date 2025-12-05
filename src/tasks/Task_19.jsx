import { useState, useEffect } from "react";
import "./Task_19.css";

function Task_19() {
  const [coordinations, setCoordinations] = useState({
    Latitude: 0,
    Longitude: 0,
  });
  const [nearestLocation, setNearestLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    fetch("./srilanka.map.json")
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error("Error loading location data:", error));
  }, []);

  function calculateDistance(lat1, lon1, lat2, lon2) {
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
  }

  function findNearestLocation(userLat, userLon) {
    if (!locationData) return null;

    let nearest = null;
    let minDistance = Infinity;

    Object.keys(locationData).forEach((district) => {
      Object.keys(locationData[district]).forEach((locationName) => {
        const location = locationData[district][locationName];
        const lat = parseFloat(location.latitude);
        const lon = parseFloat(location.longitude);

        if (!isNaN(lat) && !isNaN(lon)) {
          const distance = calculateDistance(userLat, userLon, lat, lon);

          if (distance < minDistance) {
            minDistance = distance;
            nearest = {
              district: district,
              location: locationName,
              distance: distance.toFixed(2),
              latitude: lat,
              longitude: lon,
            };
          }
        }
      });
    });

    return nearest;
  }

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

      const nearest = findNearestLocation(crd.latitude, crd.longitude);
      setNearestLocation(nearest);
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

            {nearestLocation && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <h3>Nearest Location</h3>
                <p>
                  <strong>District:</strong> {nearestLocation.district}
                </p>
                <p>
                  <strong>Location:</strong> {nearestLocation.location}
                </p>
                <p>
                  <strong>Distance:</strong> {nearestLocation.distance} km
                </p>
              </div>
            )}
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
