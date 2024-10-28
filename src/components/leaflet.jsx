import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const MapComponent = () => {
  const [markerPosition, setMarkerPosition] = useState(null); // Track the marker position
  const [address, setAddress] = useState(""); // Track fetched address
  const [savedLocations, setSavedLocations] = useState([]); // Track saved locations

  // Function to fetch address from Nominatim API
  const fetchAddress = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAddress(data.display_name || "Address not found");
    } catch (error) {
      console.error("Failed to fetch address:", error);
      setAddress("Failed to fetch address");
    }
  };

  // Custom component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]); // Set marker position
        fetchAddress(lat, lng); // Fetch address for clicked location
      },
    });

    // Render the marker and popup if markerPosition is set
    return markerPosition ? (
      <Marker position={markerPosition}>
        <Popup>
          <div>
            <p>{address}</p>
            <button
              onClick={() => {
                setSavedLocations([
                  ...savedLocations,
                  { position: markerPosition, address },
                ]);
                alert("Location saved!");
              }}
            >
              Save Location
            </button>
          </div>
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker /> {/* Add the LocationMarker component to the map */}
      {/* Render saved locations as markers */}
      {savedLocations.map((location, index) => (
        <Marker key={index} position={location.position}>
          <Popup>{location.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
