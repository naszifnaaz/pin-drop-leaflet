import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Importing Leaflet
import { useSelector, useDispatch } from "react-redux";
import {
  saveLocation,
  setAddress,
  setPosition,
} from "../store/features/map.slice";
import { useEffect } from "react";

// Set up default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Component to zoom and center map on the selected position
const ZoomToLocation = ({ position, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, zoomLevel); // Center and zoom map on the specified position
    }
  }, [position, zoomLevel, map]);

  return null; // This component only performs a side effect; it renders nothing
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const markerPosition = useSelector((store) => store.map.markerPosition);
  const address = useSelector((store) => store.map.address);
  const savedLocations = useSelector((store) => store.map.savedLocations);
  const zoomLevel = 13; // Default zoom level for focusing on selected location

  // Function to fetch address from Nominatim API
  const fetchAddress = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setAddress(data.display_name || "Address not found"));
    } catch (error) {
      console.error("Failed to fetch address:", error);
      dispatch(setAddress("Failed to fetch address"));
    }
  };

  // Function to save pinned location
  const pinLocation = () => {
    if (markerPosition && address) {
      dispatch(
        saveLocation({
          position: markerPosition,
          address,
        })
      );
    }
  };

  // Custom component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        dispatch(setPosition([lat, lng]));
        fetchAddress(lat, lng);
      },
    });

    // Render the marker and popup only if markerPosition is set
    return markerPosition ? (
      <Marker position={markerPosition}>
        <Popup>
          <div>
            <p>{address}</p>
            <button onClick={pinLocation}>Save Location</button>
          </div>
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={zoomLevel}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker /> {/* Handles clicks and marker positioning */}
      <ZoomToLocation position={markerPosition} zoomLevel={zoomLevel} />{" "}
      {/* Zooms to marker position */}
      {savedLocations.map((location, index) => (
        <Marker key={index} position={location.position}>
          <Popup>{location.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
